import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function BoardCard(props) {
	const { board: {id, name, description} } = props;
  return (
		<Card raised>
			<CardActionArea href={"/board/" + id}>
				<CardContent>
					<Typography variant="h5" color="textSecondary" gutterBottom>{name}</Typography>
					<Typography variant="body1">{description}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
  );
}

export default BoardCard;
