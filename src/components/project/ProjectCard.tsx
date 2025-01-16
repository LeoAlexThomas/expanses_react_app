import { ProjectInterface } from "@/types/project";
import { Box, chakra, HStack, Text, VStack } from "@chakra-ui/react";
import { colors } from "../utils";
import Link from "next/link";

const ProjectCard = ({ project }: { project: ProjectInterface }) => {
  return (
    <Link href={`/project/${project._id}`}>
      <Box p={3} boxShadow="md" borderRadius="8px" w="100%" maxW="350px">
        <VStack alignItems="stretch" spaceY={1}>
          <Text
            fontFamily="Playfair Display"
            fontSize={["16px", null, "18px"]}
            fontWeight={800}
            lineHeight="1.25"
          >
            {project.title}
          </Text>
          <Text
            fontFamily="Roboto"
            fontSize={["14px", null, "16px"]}
            lineHeight="1.25"
            maxLines={2}
            textOverflow="ellipsis"
            color={colors.greyColor[5]}
          >
            {project.description}
          </Text>
          <HStack justifyContent="space-between">
            <Text
              fontFamily="Roboto"
              fontSize={["12px", null, "14px"]}
              lineHeight="1.25"
              fontWeight={500}
            >
              Sub-Expanses: {project.expanses.length}
            </Text>
            {project.totalSpent > 0 && (
              <Text
                fontFamily="Roboto"
                fontSize={["12px", null, "14px"]}
                lineHeight="1.25"
                fontWeight={500}
              >
                Spent:{" "}
                <chakra.span fontWeight={800} color="red">
                  ₹{project.totalSpent}
                </chakra.span>
              </Text>
            )}
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
};

export default ProjectCard;
