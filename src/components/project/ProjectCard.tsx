import { ProjectInterface } from "@/types/project";
import { chakra, HStack, Text, VStack } from "@chakra-ui/react";
import { colors } from "../utils";
import Link from "next/link";
import { Avatar, AvatarGroup } from "../ui/avatar";

const ProjectCard = ({ project }: { project: ProjectInterface }) => {
  return (
    <Link
      href={`/project/${project._id}`}
      style={{
        width: "100%",
      }}
    >
      <HStack
        p={3}
        boxShadow="md"
        borderRadius="8px"
        gap={[4, null, 8]}
        h="100px"
        transition="transform 0.3s ease-in-out"
        bg="white"
        _hover={{
          boxShadow: "lg",
          transform: "scale(1.03)",
        }}
      >
        <VStack alignItems="stretch" spaceY={1}>
          <Text
            fontFamily="Playfair Display"
            fontSize={["16px", null, "18px"]}
            fontWeight={800}
            lineHeight="1.25"
          >
            {project.title}
          </Text>
          {project.description && (
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
          )}
          <Text
            fontFamily="Roboto"
            fontSize={["12px", null, "14px"]}
            lineHeight="1.25"
            fontWeight={500}
          >
            Sub-Expanses: {project.expanses.length}
          </Text>
        </VStack>
        <VStack alignItems="flex-end">
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

          <AvatarGroup size="sm" stacking="last-on-top">
            {project.members.map((member) => {
              return <Avatar key={member.email} name={member.name} />;
            })}
          </AvatarGroup>
        </VStack>
      </HStack>
    </Link>
  );
};

export default ProjectCard;
