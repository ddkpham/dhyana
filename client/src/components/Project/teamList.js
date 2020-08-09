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
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
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
	const [ successOpen, setSuccessOpen ] = useState(false);
	const classes = useStyles();

  useEffect(() => {
    function search() {
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

		postCall(url, addUserBody)
			.then((response) => response.json())
			.then((payload) => {
				console.log('hey toria add user response', payload);
				reload(teamId);
				closeTeamPopover();
				setOptions([]);
				setSuccessOpen(true)
			})
			.catch((err) => console.log('hey toria add user error', err));
  };

	function openTeamPopover(event) {
		setTeamPopover(event.currentTarget);
	}

	function closeTeamPopover() {
		setTeamPopover(null);
		closeSearchResults();
	}

	function openSearchResults(event){
		setSearchMenu(event.currentTarget)
	}

	function closeSearchResults(){
		setSearchMenu(null)
	}

	const displayTeam = teamMembers.slice(0, 3);
	const showAllTeam = Boolean(teamPopover);
	const teamPopoverId = showAllTeam ? 'team-popover' : undefined;

	const maxResults = 10;
	console.log('hey toria input', input)
	return (
		<span className={classes.teamWrapper}>
			<Snackbar open={successOpen} autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={() => setSuccessOpen(false)}>
				<Alert onClose={() => setSuccessOpen(false)} severity="success">
					User has been added to team!
				</Alert>
			</Snackbar>
			{displayTeam.map((t) => (
				<UserAvatar user={t} classes={{button: classes.userAvatarWrapper, avatar: classes.userAvatar}}/>
			))}
			<IconButton className={classes.userAvatarWrapper} onClick={showAllTeam ? closeTeamPopover : openTeamPopover}><MoreHorizIcon/></IconButton>
			<Popover
				id={teamPopoverId}
				open={showAllTeam}
				anchorEl={teamPopover}
				onClose={closeTeamPopover}
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
					onFocus={openSearchResults}
					onChange={(event) => {
						setInput(event.target.value);
						if(event.target.value.length===0) setOptions([]);
					}}
				/>
				<Popover
					id="search-results"
					anchorEl={searchMenu}
					disableAutoFocus
					disableEnforceFocus
					open={!!input.length && Boolean(searchMenu)}
					onClose={closeSearchResults}
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