import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { baseURL } from "../../config/settings";
import { postCall } from "../../apiCalls/apiCalls";
import UserAvatar from '../Home/TeamCard/avatar';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import TextField from "@material-ui/core/TextField";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  teamWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  userAvatarWrapper: {
    padding: 2,
  },
  userAvatar:{
    height: 30,
    width: 30,
    fontSize: 'small'
  }
}));


const ProjectTeam = ({ teamMembers, teamId, reload }) => {
	const [userOptions, setOptions] = useState([]);
	const [teamPopover, setTeamPopover] = useState(null);
	const [searchMenu, setSearchMenu] = useState(null);
	const [input, setInput] = useState('');
	const classes = useStyles();

  useEffect(() => {
    function search() {
			console.log('hey toria search input', input)
			const searchString = { input };
			const url = `${baseURL}/user/search/result`;
			postCall(url, searchString)
				.then((response) => response.json())
				.then((data) => {
					console.log("hey toria user options", data);
					setOptions(data.data);
				})
				.catch((err) => console.log("user search error", err));
		}

    if (input.length) {
      search();
    }
	}, [input]);

	function addUser(user) {
    const url = `${baseURL}/team/add-user`;
		const user_id = user.id;
		const addUserBody = { team_id: teamId, user_id };
		console.log("hey toria body", addUserBody);

		postCall(url, addUserBody)
			.then((response) => response.json())
			.then((payload) => {
				console.log('hey toria add user response', payload);
				reload(teamId)
			})
			.catch((err) => console.log('hey toria add user error', err));
  };

	function openPopover(event) {
		setTeamPopover(event.currentTarget);
	}

	function closePopover() {
		setTeamPopover(null);
	}

	const displayTeam = teamMembers.slice(0, 3);
	const showAllTeam = Boolean(teamPopover);
	const teamPopoverId = showAllTeam ? 'team-popover' : undefined;

	const maxResults = 10;
	console.log('hey toria userOptions', userOptions);

	return (
		<span className={classes.teamWrapper}>
			{displayTeam.map((t) => (
				<UserAvatar user={t} classes={{button: classes.userAvatarWrapper, avatar: classes.userAvatar}}/>
			))}
			<IconButton className={classes.userAvatarWrapper} onClick={openPopover}><MoreHorizIcon/></IconButton>
			<Popover
				id={teamPopoverId}
				open={showAllTeam}
				anchorEl={teamPopover}
				onClose={closePopover}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Typography variant="h6">Team Members</Typography>
				{teamMembers.map((t) => (
					<UserAvatar user={t} classes={{button: classes.userAvatarWrapper, avatar: classes.userAvatar}}/>
				))}
				<TextField
					variant="outlined"
					placeholder="Add new teammate"
					onFocus={(event) => setSearchMenu(event.currentTarget)}
					onChange={(event) => {
						console.log('hey toria onChange', event.target.value)
						if(event.target.value.length) setInput(event.target.value);
						else setOptions([]);
					}}
				/>
				<Popover
					id="search-results"
					anchorEl={searchMenu}
					disableAutoFocus
					disableEnforceFocus
					open={Boolean(searchMenu)}
					onClose={(event) => {
						setSearchMenu(null)
					}}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
				>
					<MenuList>
						{!!input && userOptions.slice(0, maxResults).map((u) =>(
							<MenuItem onClick={() => {
								console.log('hey toria add', u);
								addUser(u);
							}}>
								{u.username}
							</MenuItem>
						))}
						{userOptions.length===0 && <MenuItem>No Results</MenuItem>}
					</MenuList>
				</Popover>
			</Popover>
		</span>
	);
};

export default ProjectTeam;