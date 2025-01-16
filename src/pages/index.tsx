import Head from "next/head";
import { Box, IconButton, useDisclosure, HStack } from "@chakra-ui/react";
import { AddCircle } from "@emotion-icons/fluentui-system-regular/AddCircle";
import ProjectFormModel from "@/components/project/ProjectFormModel";
import WithLoader from "@/components/WithLoader";
import { ProjectInterface } from "@/types/project";
import ProjectCard from "@/components/project/ProjectCard";
import Layout from "@/components/Layout";

export default function Home() {
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Expanses</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ProjectFormModel isOpen={isOpen} onClose={onClose} />
        <WithLoader apiUrl={`/projects/all`}>
          {({ data }: { data: ProjectInterface[] }) => {
            return (
              <HStack
                wrap="wrap"
                gap={4}
                px={6}
                pt={3}
                pb={16}
                alignItems="flex-start"
              >
                {data.map((project, index) => {
                  return (
                    <Box key={project._id}>
                      <ProjectCard project={project} />
                    </Box>
                  );
                })}
              </HStack>
            );
          }}
        </WithLoader>
        <IconButton
          pos="fixed"
          bottom={4}
          right={4}
          rounded="full"
          aria-label="add project"
          size={["md", null, "xl"]}
          _icon={{
            boxSize: ["30px", null, "35px"],
          }}
          onClick={onOpen}
        >
          <AddCircle />
        </IconButton>
      </Layout>
    </>
  );
}
