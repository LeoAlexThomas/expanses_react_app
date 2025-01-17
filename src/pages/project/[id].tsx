import { PrimaryButton } from "@/components/Buttons";
import Layout from "@/components/Layout";
import ExpanseCard from "@/components/project/ExpanseCard";
import ExpanseFormModel from "@/components/project/ExpanseFormModel";
import { colors } from "@/components/utils";
import WithLoader from "@/components/WithLoader";
import { ProjectInterface } from "@/types/project";
import {
  Box,
  GridItem,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const ProjectIdPage = () => {
  const router = useRouter();
  const projectId = router.query.id;
  const { open: isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Layout>
      <WithLoader apiUrl={projectId ? `/project/${projectId}` : ""}>
        {({ data, mutate }: { data: ProjectInterface; mutate: () => void }) => {
          return (
            <Box p={4}>
              <ExpanseFormModel
                isOpen={isOpen}
                onClose={onClose}
                projectId={data._id}
                onSuccess={() => {
                  mutate();
                  onClose();
                }}
              />
              <VStack alignItems="stretch" spaceY={3}>
                <Stack
                  w="100%"
                  alignItems="stretch"
                  justifyContent="space-between"
                  direction={{ base: "column", sm: "row" }}
                >
                  <Text
                    fontFamily="Playfair Display"
                    fontSize={["20px", null, "36px"]}
                    fontWeight={800}
                    lineHeight="1.25"
                  >
                    {data.title}
                  </Text>
                  <Text
                    fontFamily="Roboto"
                    fontSize={["24px", null, "40px"]}
                    fontWeight={800}
                    lineHeight="1.25"
                    color="red"
                  >
                    INR {data.totalSpent}
                  </Text>
                </Stack>
                {data.description && (
                  <Text
                    fontFamily="Roboto"
                    fontSize={["16px", null, "18px"]}
                    fontWeight={500}
                    lineHeight="1.25"
                    textAlign="start"
                    color={colors.greyColor[4]}
                  >
                    {data.description}
                  </Text>
                )}
              </VStack>
              <Spacer h={6} />
              <Text
                fontFamily="Playfair Display"
                fontSize={["20px", null, "26px"]}
                fontWeight={800}
                lineHeight="1.25"
              >
                Expanses:{" "}
              </Text>
              <Spacer h={4} />
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} pb={3}>
                {data.expanses.map((exp) => (
                  <GridItem key={exp._id}>
                    <ExpanseCard expanse={exp} projectMutate={mutate} />
                  </GridItem>
                ))}
              </SimpleGrid>
              <PrimaryButton
                pos="fixed"
                bottom={4}
                right={4}
                fontWeight={700}
                rounded="12px"
                aria-label="add project"
                size={["md", null, "xl"]}
                onClick={onOpen}
              >
                Add Task
              </PrimaryButton>
            </Box>
          );
        }}
      </WithLoader>
    </Layout>
  );
};

export default ProjectIdPage;
