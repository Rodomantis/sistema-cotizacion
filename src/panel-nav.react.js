import React, { Component } from 'react';
import { Button, ButtonGroup, DropdownButton, MenuItem, Nav } from 'react-bootstrap';

var PanelNav = React.createClass({
	render() {
    return (
	<div className="PanelNav">
      <ButtonGroup vertical>
			<Button>Button</Button>
			<Button>Button</Button>
			<DropdownButton title="Dropdown" id="bg-vertical-dropdown-1">
			<MenuItem eventKey="1">Dropdown link</MenuItem>
			<MenuItem eventKey="2">Dropdown link</MenuItem>
			</DropdownButton>
			<Button>Button</Button>
			<Button>Button</Button>
			<DropdownButton title="Dropdown" id="bg-vertical-dropdown-2">
			<MenuItem eventKey="1">Dropdown link</MenuItem>
			<MenuItem eventKey="2">Dropdown link</MenuItem>
			</DropdownButton>
			<DropdownButton title="Dropdown" id="bg-vertical-dropdown-3">
			<MenuItem eventKey="1">Dropdown link</MenuItem>
			<MenuItem eventKey="2">Dropdown link</MenuItem>
			</DropdownButton>
		</ButtonGroup>
		</div>
    );
  }
});

export default PanelNav;