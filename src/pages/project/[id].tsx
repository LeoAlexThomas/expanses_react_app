import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import Layout from "@/components/Layout";
import { colors } from "@/components/utils";
import WithLoader from "@/components/WithLoader";
import { ProjectInterface } from "@/types/project";
import {
  Box,
  Center,
  GridItem,
  HStack,
  IconButton,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Delete } from "@emotion-icons/fluentui-system-regular/Delete";
import { Edit } from "@emotion-icons/entypo/Edit";
import CustomModel from "@/components/CustomModal";
import { useApi } from "@/hook/useApi";
import api from "@/components/api";
import ProjectFormModel from "@/components/project/ProjectFormModel";
import { isEmpty } from "lodash";
import ExpenseFormModel from "@/components/project/ExpenseFormModel";
import ExpenseCard from "@/components/project/ExpenseCard";

const ProjectIdPage = () => {
  const { makeApiCall } = useApi();
  const router = useRouter();
  const projectId = router.query.id;
  const { open: isOpen, onClose, onOpen } = useDisclosure();
  const {
    open: isConfirmationOpen,
    onClose: onConfirmationClose,
    onOpen: onConfirmationOpen,
  } = useDisclosure();

  const {
    open: isEditProjectOpen,
    onClose: onEditProjectClose,
    onOpen: onEditProjectOpen,
  } = useDisclosure();

  const handleProjectDelete = () => {
    makeApiCall({
      apiFn: () =>
        api(`/project/delete/${projectId}`, {
          method: "DELETE",
        }),
      successMsg: {
        title: "project deleted successfully",
      },
      onSuccess: (res) => {
        router.replace("/");
      },
    });
  };

  const handleEditProject = ({
    values,
    projectMutate,
  }: {
    values: any;
    projectMutate: () => void;
  }) => {
    makeApiCall({
      apiFn: () =>
        api(`/project/update/${projectId}`, {
          method: "PUT",
          data: values,
        }),
      successMsg: {
        title: "Project updated successfully",
      },
      onSuccess: (res) => {
        projectMutate();
        onEditProjectClose();
      },
    });
  };

  return (
    <Layout>
      <WithLoader apiUrl={projectId ? `/project/${projectId}` : ""}>
        {({ data, mutate }: { data: ProjectInterface; mutate: () => void }) => {
          return (
            <Box p={4}>
              <ExpenseFormModel
                isOpen={isOpen}
                onClose={onClose}
                projectId={data._id}
                onSuccess={() => {
                  mutate();
                  onClose();
                }}
              />
              <ProjectFormModel
                isOpen={isEditProjectOpen}
                onClose={onEditProjectClose}
                defaultFormValues={{
                  memberIds: data.members.map((mem) => ({
                    label: `${mem.name} (${mem.email})`,
                    value: mem._id,
                  })),
                  title: data.title,
                  totalSpent: data.totalSpent,
                  description: data.description,
                }}
                onEditProject={(values) =>
                  handleEditProject({ values, projectMutate: mutate })
                }
              />
              <CustomModel
                isOpen={isConfirmationOpen}
                onClose={onConfirmationClose}
                title="Confirmation!!!"
                footer={
                  <>
                    <PrimaryButton
                      bg={colors.redColor[2]}
                      color={colors.redColor[7]}
                      _hover={{
                        bg: colors.redColor[1],
                      }}
                      onClick={handleProjectDelete}
                    >
                      Delete
                    </PrimaryButton>
                    <SecondaryButton onClick={onConfirmationClose}>
                      Close
                    </SecondaryButton>
                  </>
                }
              >
                <Text pb="60px">
                  Are you sure you want to delete this project?
                </Text>
              </CustomModel>
              <VStack alignItems="stretch" spaceY={3}>
                <HStack>
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
                    {data.totalSpent > 0 && (
                      <Text
                        fontFamily="Roboto"
                        fontSize={["24px", null, "40px"]}
                        fontWeight={800}
                        lineHeight="1.25"
                        color={colors.greenColor[4]}
                      >
                        INR {data.totalSpent}
                      </Text>
                    )}
                  </Stack>
                  <IconButton
                    variant="outline"
                    borderColor={colors.blueColor[3]}
                    _icon={{
                      w: "25px",
                      h: "25px",
                    }}
                    onClick={onEditProjectOpen}
                  >
                    <Edit color={colors.blueColor[4]} />
                  </IconButton>
                  <IconButton
                    variant="plain"
                    bg={colors.redColor[0]}
                    _icon={{
                      w: "25px",
                      h: "25px",
                    }}
                    onClick={onConfirmationOpen}
                  >
                    <Delete color={colors.redColor[4]} />
                  </IconButton>
                </HStack>
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
                Expenses:{" "}
              </Text>
              <Spacer h={4} />
              {isEmpty(data.expenses) ? (
                <Center>
                  <Text>No Expenses found</Text>
                </Center>
              ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} pb={3}>
                  {data.expenses.map((exp) => (
                    <GridItem key={exp._id}>
                      <ExpenseCard expense={exp} projectMutate={mutate} />
                    </GridItem>
                  ))}
                </SimpleGrid>
              )}
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
                Add Expense
              </PrimaryButton>
            </Box>
          );
        }}
      </WithLoader>
    </Layout>
  );
};

export default ProjectIdPage;
