import Head from "next/head";
import {
  Box,
  IconButton,
  useDisclosure,
  HStack,
  Center,
  Text,
} from "@chakra-ui/react";
import { AddCircle } from "@emotion-icons/fluentui-system-regular/AddCircle";
import ProjectFormModel from "@/components/project/ProjectFormModel";
import WithLoader from "@/components/WithLoader";
import { ProjectInterface } from "@/types/project";
import ProjectCard from "@/components/project/ProjectCard";
import Layout from "@/components/Layout";
import isEmpty from "lodash/isEmpty";

export default function Home() {
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Expenses</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ProjectFormModel isOpen={isOpen} onClose={onClose} />
        <WithLoader apiUrl={`/project/all`}>
          {({ data }: { data: ProjectInterface[] }) => {
            if (isEmpty(data)) {
              return (
                <Center h="100%">
                  <Text>No projects found</Text>
                </Center>
              );
            }
            return (
              <HStack
                wrap="wrap"
                gap={4}
                px={6}
                pt={3}
                pb={16}
                alignItems="flex-start"
              >
                {data.map((project) => {
                  return (
                    <Box w={["100%", "fit-content"]} key={project._id}>
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
