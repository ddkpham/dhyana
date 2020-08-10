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
import Paper from '@material-ui/core/Paper';
import AddIcon from "@material-ui/icons/Add";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { fade, makeStyles } from "@material-ui/core/styles";
import Hidden from '@material-ui/core/Hidden';
import ConfirmDialog from "../ConfirmDialog";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	teamWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
	},
	moreAvatar: {
		padding: 2,
		background: theme.colours.bronze,
		color: 'white',
		'&:hover': {
			backgroundColor: fade(theme.colours.bronze, 0.5)
		}
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
	},
	successMessage: {
		background: 'darkseagreen',
		color: 'white',
		padding: '10px 15px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		'& *': {
			margin: '0px 10px'
		}
	},
	serachField: {
		height: 45,
	},
	popoverDiv: {
		paddingTop: 5,
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: "center",
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
	const [ confirmOpen, setConfirm ] = useState(false)
	const [ selectedUserId, setUserId ] = useState();
	const classes = useStyles();

  useEffect(() => {
    function search() {
			const searchString = { input };
			const url = `${baseURL}/user/search/result`;
			setSearchError(false);
			postCall(url, searchString)
				.then((response) => response.json())
				.then((data) => {
					console.log("search user result", data);
					setOptions(data.data);
				})
				.catch((err) => {
					setSearchError(true);
					setOptions([])
					console.log("user search error", err);
				});
		}

    if (input.length) {
      search();
    }
	}, [input]);

	function addUser() {
    const url = `${baseURL}/team/add-user`;
		const addUserBody = { team_id: teamId, user_id: selectedUserId };
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
			<ConfirmDialog
				message='This user will be able to see all projects associated with this team'
				open={confirmOpen}
				confirm={() =>{
					addUser();
					setConfirm(false);
				}}
				deny={() => setConfirm(false)}
			/>
			<Snackbar
				open={successOpen}
				autoHideDuration={4000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={() => setSuccessOpen(false)}
			>
				<Paper classes={{root: classes.successMessage}}>
					<CheckCircleOutlineIcon/> <Typography>New Teammate Added!</Typography>
				</Paper>
			</Snackbar>
			<Hidden smDown>
				{displayTeam.map((t) => (
					<UserAvatar user={t} classes={{button: classes.userAvatarWrapper, avatar: classes.userAvatar}}/>
				))}
			</Hidden>
			<IconButton classes={{root: classes.moreAvatar}} onClick={showAllTeam ? closeTeamPopover : openTeamPopover}><MoreHorizIcon/></IconButton>
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
				<div className={classes.popoverDiv}>
					<div className={classes.teamList}>
						{teamMembers.map((t) => (
							<UserAvatar user={t} classes={{button: classes.userAvatarWrapper, avatar: classes.userAvatar}}/>
						))}
					</div>

					<Typography>Add New Teammate:</Typography>
					{addError && <Typography variant='body2' className={classes.errorMessage}>Error adding user</Typography>}
					<TextField
						className={classes.serachField}
						variant="outlined"
						placeholder="Search..."
						type='text'
						onChange={(event) => {
							setInput(event.target.value);
							openSearchResults(event)
							if(event.target.value.length===0) setOptions([]);
						}}
					/>
				</div>
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
							<MenuItem
								className={classes.searchResult}
								onClick={() => {
									setUserId(u.id);
									setConfirm(true);
								}}
							>
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