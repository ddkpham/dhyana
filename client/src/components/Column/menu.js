import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
	select: {
		minWidth: "100px",
	},
	menuLabel: {
		marginRight: "5px",
		color: theme.colours.eerie_black
	}
}));

const ColumnMenu = ({anchorEl, handleClose, setSort, filters, filterOptions, setFilters}) => {
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
      <MenuItem >
				<InputLabel color="primary" id="sort-label" classes={{root: classes.menuLabel}}>Sort By:</InputLabel>
        <Select
					id="sort-select"
					labelId="sort-label"
          variant="outlined"
					value=""
					classes={{ select: classes.select }}
          onChange={(event) => {
            setSort({ sortBy: event.target.value });
            handleClose();
          }}
        >
          {sortOptions.map((o) => {
            return <MenuItem value={o.id}>{o.name}</MenuItem>;
          })}
        </Select>
      </MenuItem>
      <MenuItem classes={{root: classes.menuLabel}}>Filter By:</MenuItem>
				{filterOptions.map((f) => (
					<MenuItem>
						<InputLabel id={`${f.name}-label`} classes={{root: classes.menuLabel}}>{f.name}:</InputLabel>
						<Select
							id={f.id}
							labelId={`${f.name}-label`}
							multiple
							variant="outlined"
							value={filters[f.id] || []}
							classes={{select: classes.select}}
							onChange={(event) => {
								setFilters(event.target.value, f.id);
							}}
							renderValue={(selected) => selected.join(', ')}
						>
							{f.options.map((option) => (
								<MenuItem key={option.id} value={option.id}>
									<Checkbox checked={filters[f.id]?.indexOf(option.id) > -1} />
									<ListItemText primary={option.name} />
								</MenuItem>
							))}
						</Select>
					</MenuItem>
				))}
    </Menu>
  );
}

export default ColumnMenu;