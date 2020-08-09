import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { clientBaseURL } from "../../../config/settings";

const navigateToUserPage = (username) => {
	console.log("TeamCard -> navigateToUserPage -> username", username);
	window.location.href = `${clientBaseURL}/user/${username}`;
};

const UserAvatar = ({ user: {username, first_name, last_name}, classes, ...rest }) => {
	return (
		<IconButton
			className={classes?.button}
			onClick={() => navigateToUserPage(username)}
			{...rest}
		>
			{first_name && last_name ?
				<Avatar className={classes?.avatar}>
					{first_name.charAt(0)}
					{last_name.charAt(0)}
				</Avatar>:
				<Avatar className={classes?.avatar}>
					{username.charAt(0)}
					{username.charAt(1)}
				</Avatar>
			}
		</IconButton>
	);
}

export default UserAvatar