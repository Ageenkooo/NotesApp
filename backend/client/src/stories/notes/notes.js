import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import Item from '../item/item';
import Lable from '../lable/lable';
import Input from '../input/input';

const propsValues = {
    title: "your notes",
    items: [
        "first note",
        "second note",
        "third note",
        "fourth note",
        "fifth note",
        "six note"
    ]
};

class Notes extends React.Component {
    constructor(props){
        super(props);
        this.state = { items: propsValues.items};

        this.filterList = this.filterList.bind(this);
    }
    filterList(e){
        var filteredList = propsValues.items.filter(function(item){
            return item.toLowerCase().search(e.target.value.toLowerCase())!== -1;
        });
        this.setState({items: filteredList});
    }

    render() {
        return(
            <div>
                <Lable>{propsValues.title}</Lable>
                <Input placeholder="search notes" onChange={this.filterList} />
                    {
                        this.state.items.map(function(item){
                            return <Item className="left" key={item} name={item} />
                        })
                    }

            </div>);
    }
}

export default Notes;
