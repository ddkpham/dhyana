import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function UserCard(props) {
	const { user: {username, first_name, last_name} } = props;
	return (
		<Card raised>
			<CardActionArea href={"/user/" + first_name}>
				<CardContent>
					<Typography variant="h5" color="textSecondary" gutterBottom>{username}</Typography>
					<Typography variant="body1">{first_name}</Typography>
                    <Typography variant="body1">{last_name}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default UserCard;
