import { Container, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  const { userProfile, isLoading } = useGetUserProfileByUsername(username);

  const userNotFound = !userProfile && !isLoading;
  if (userNotFound) {
    return <UserNotFound />;
  }

  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        mx={"auto"}
        flexDirection={"column"}
      >
        <ProfileHeader />
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid "}
        borderColor={"whiteAlpha.300"}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

export default ProfilePage;

const UserNotFound = () => {
  return (
    <Flex flexDir={"column"} mx={"auto"} alignItems={"center"}>
      <Text fontSize={"2xl"}>User not found</Text>
      <Link
        as={RouterLink}
        to={"/"}
        color={"blue.500"}
        w={"max-content"}
        mx={"auto"}
      >
        Go Home
      </Link>
    </Flex>
  );
};
