import {
    Body,
    Button,
    Container,
    Content,
    Fab,
    FlatList,
    Header,
    Icon,
    IconNB,
    Left,
    List,
    ListItem,
    Right,
    Spinner,
    Subtitle,
    Text,
    Thumbnail,
    Title
} from "native-base";
import React, { Component } from "react";
import { ListView, View } from 'react-native';

import PropTypes from "prop-types";
import _ from "lodash";

export default class ListResultBC extends Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    
    render() {
        if (!!this.props.data && this.props.data.length > 0) {
            return <List
                disableLeftSwipe
                leftOpenValue={75}
                rightOpenValue={-75}
                dataSource={this.ds.cloneWithRows(this.props.data)}
                renderRow={(item) => (<ListItem thumbnail style={{paddingLeft: 10, paddingRight: 10}}>
                    <Left>
                        {_.get(item, "thumb") && item.thumb.trim() !== "" 
                            ? <Thumbnail square source={{ uri: item.thumb }} style={{width: 60, height: 60}} /> 
                            : <Icon name="md-image" style={{fontSize: 60, width: 60}} />}
                    </Left>
                    <Body>
                        <Text>{item.title}</Text>
                        <Text note>{item.type} - {item.year}</Text>
                        <View style={{flexDirection: "row"}}>
                            <Text note style={{color: "black", flex: 1}}>Format :</Text>
                            <Text note style={{flex: 3}} numberOfLines={3}>{_.chain(item.format).uniq().map(e => e).join(", ").value()}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text note style={{color: "black", flex: 1}}>Label :</Text>
                            <Text note style={{flex: 3}} numberOfLines={3}>{_.chain(item.label).uniq().map(e => e).join(", ").value()}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text note style={{color: "black", flex: 1}}>BC :</Text>
                            <Text note style={{flex: 3}} numberOfLines={3}>{_.chain(item.barcode).uniq().map(e => e).join(", ").value()}</Text>
                        </View>
                    </Body>
                    </ListItem>)    
                }
                renderLeftHiddenRow={data =>
                    <Button full onPress={() => alert(data)}>
                      <Icon active name="information-circle" />
                    </Button>}
            />;

        } else {
            return <Text>Pas de résultat</Text>;
        }
    }
}

ListResultBC.propTypes = {
    data: PropTypes.array.isRequired
};
