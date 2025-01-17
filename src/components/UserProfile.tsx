import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu";
import { useUserInfo } from "@/context/userInfo";
import { colors, logout } from "@/components/utils";
import useCustomToast, { ToastStatusEnum } from "@/hook/useCustomToast";
import { useRouter } from "next/router";
import random from "lodash/random";
import { Avatar } from "./ui/avatar";

const UserProfile = () => {
  const router = useRouter();
  const { userName } = useUserInfo();
  const { showToast } = useCustomToast();
  const handleLogOut = async () => {
    logout();
    showToast({
      title: "Logged out",
      status: ToastStatusEnum.success,
    });
    router.reload();
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Avatar
          name={userName}
          // w={["28px", "40px"]}
          // h={["28px", "40px"]}
          size={["sm", null, "md"]}
          backgroundColor={colors.blueColor[random(0, 7)]}
          border={`2px solid ${colors.greyColor[0]}`}
          color={colors.greyColor[0]}
        />
      </MenuTrigger>
      <MenuContent>
        <MenuItem value={userName} />
        <MenuItem value="Logout" onClick={handleLogOut} />
      </MenuContent>
    </MenuRoot>
  );
};

export default UserProfile;
