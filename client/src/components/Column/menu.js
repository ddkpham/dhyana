import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	select: {
		width: "150px",
		margin: 0,
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	menuHeader: {
		color: theme.colours.teal,
		fontWeight: 'bold',
	},
	deleteButton: {
		color: 'red',
		borderColor: 'red',
	},
	menuItem: {
		marginLeft: '10px',
	},
	menuSection: {
		marginBottom: '10px',
	}
}));

const ColumnMenu = ({anchorEl, handleClose, sort, setSort, filters, filterOptions, setFilters, deleteFunction}) => {
  const sortOptions = [
    {name: 'Task Title', id: 'name'},
    {name: 'Date Created', id: 'date_created'},
    {name: 'Priority', id: 'priority'},
    {name: 'Assigned User', id: 'user_id_assigned'},
	];

	const classes = useStyles();

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
			<div className={classes.menuSection}>
				<MenuItem disabled>
					<Typography className={classes.menuHeader}>Sort By</Typography>
				</MenuItem>
				<MenuItem className={classes.menuItem}>
					<form>
						<Select
							id="sort-select"
							label="sort-label"
							value={sort}
							shrink
							classes={{ select: classes.select }}
							onChange={(event) => {
								setSort({ sortBy: event.target.value });
								handleClose();
							}}
						>
							{sortOptions.map((o) => {
								return <MenuItem value={o.id}>{o.name}</MenuItem>;
							})}
							<MenuItem value={""}>None</MenuItem>
						</Select>
					</form>
				</MenuItem>
			</div>
			<div className={classes.menuSection}>
      <MenuItem disabled>
				<Typography className={classes.menuHeader}>Filter By</Typography>
			</MenuItem>
				{filterOptions.map((f) => (
					<MenuItem className={classes.menuItem}>
						<form>
							<InputLabel id={`${f.name}-label`} shrink margin='dense'>{f.name}</InputLabel>
							<Select
								id={f.id}
								label={f.name}
								multiple
								value={filters[f.id] || []}
								classes={{select: classes.select}}
								onChange={(event) => {
									setFilters(event.target.value, f.id);
								}}
								renderValue={(selected) => {
									if(f.displayName){
										const selectNames = selected.map((s) => f.options.find((o) => o.id === s)?.name);
										return selectNames.join(', ')
									}
									return selected.join(', ')
								}}
							>
								{f.options.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										<Checkbox checked={filters[f.id]?.indexOf(option.id) > -1} />
										<ListItemText primary={option.name} />
									</MenuItem>
								))}
							</Select>
						</form>
					</MenuItem>
				))}
				</div>
				<MenuItem><Button variant="outlined" classes={{outlined: classes.deleteButton}} onClick={deleteFunction}>Delete</Button></MenuItem>
    </Menu>
  );
}

export default ColumnMenu;