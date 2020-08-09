import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { baseURL } from "../../config/settings";
import { postCall } from "../../apiCalls/apiCalls";
import UserAvatar from '../Home/TeamCard/avatar';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Input from "@material-ui/core/Input";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AddIcon from "@material-ui/icons/Add";
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
	},
	teamPopover:{
		maxWidth: 300,
		padding: 5,
	},
	teamList: {
		marginBottom: 10,
	},
	searchResult: {
		display: 'flex',
		justifyItems: 'flex-start',
		padding: 5
	},
	errorMessage: {
		color: 'red',
	}
}));


const ProjectTeam = ({ teamMembers, teamId, reload }) => {
	const [userOptions, setOptions] = useState([]);
	const [teamPopover, setTeamPopover] = useState(null);
	const [searchMenu, setSearchMenu] = useState(null);
	const [input, setInput] = useState('');
	const [ successOpen, setSuccessOpen ] = useState(false);
	const [ searchError, setSearchError ] = useState(false);
	const [ addError, setAddError ] = useState(false);
	const classes = useStyles();

  useEffect(() => {
    function search() {
			const searchString = { input };
			const url = `${baseURL}/user/search/result`;
			postCall(url, searchString)
				.then((response) => response.json())
				.then((data) => {
					if(data.success){
						console.log("search user result", data);
						setOptions(data.data);
					} else {
						setSearchError(true);
					}
				})
				.catch((err) => {
					setSearchError(true);
					console.log("user search error", err);
				});
		}

    if (input.length) {
      search();
    }
	}, [input]);

	function addUser(user) {
    const url = `${baseURL}/team/add-user`;
		const user_id = user.id;
		const addUserBody = { team_id: teamId, user_id };
		setAddError(false)
		postCall(url, addUserBody)
			.then((response) => response.json())
			.then((payload) => {
				console.log('add user response', payload);
				if(payload.success){
					reload(teamId);
					closeTeamPopover();
					setOptions([]);
					setSuccessOpen(true);
				} else {
					setAddError(true)
				}
			})
			.catch((err) => {
				setAddError(true)
				console.log('add user error', err)
			});
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

	const maxResults = 6;
	const searchResultOpen = !!input.length && Boolean(searchMenu);

	return (
		<span>
			<Snackbar open={successOpen} autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={() => setSuccessOpen(false)}>
				<Alert onClose={() => setSuccessOpen(false)} severity="success">
					New Teammate Added!
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
				classes={{paper: classes.teamPopover}}
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
				<div className={classes.teamList}>
				<Typography variant="h6">Team Members</Typography>
					{teamMembers.map((t) => (
						<UserAvatar user={t} classes={{button: classes.userAvatarWrapper, avatar: classes.userAvatar}}/>
					))}
				</div>

				<Typography>Add New Teammate:</Typography>
				{addError && <Typography variant='body2' className={classes.errorMessage}>Error adding user</Typography>}
				<Input
					variant="outlined"
					placeholder="Search..."
					type='text'
					onChange={(event) => {
						setInput(event.target.value);
						openSearchResults(event)
						if(event.target.value.length===0) setOptions([]);
					}}
				/>
				<Popover
					id="search-results"
					anchorEl={searchMenu}
					disableAutoFocus
					disableEnforceFocus
					open={searchResultOpen}
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
							<MenuItem className={classes.searchResult} onClick={() => addUser(u)}>
								<AddIcon/>
								<div>
									{u.username}
									<Typography variant='body2'>{u.first_name} {u.last_name}</Typography>
								</div>
							</MenuItem>
						))}
						{!searchError && userOptions.length===0 && <MenuItem>No Results</MenuItem>}
						{searchError &&
							<MenuItem>
								<Typography variant='body2' className={classes.errorMessage}>Error searching...</Typography>
							</MenuItem>
						}
					</MenuList>
				</Popover>
			</Popover>
		</span>
	);
};

export default ProjectTeam;