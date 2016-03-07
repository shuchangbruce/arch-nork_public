//helpre.js builds a class containing nork game logic and exports the class for outside use
//There are two public functions that are accessible for outside use,
//all other functions are internal

'use strict';
class nork_logic {
    constructor() {
        this._world = require('../common/world');
        this._rooms = this._world.rooms;
        this._currentRoom = this._rooms[0];
        this._inventory = [];
    }

    //print the current inventory status
    _printInventory() {
        if(this._inventory.length > 0){
            return 'You have ' + this._inventory.toString();
        }else {
            return 'You do not have anything.';
        }

    }

    //handles user's take command
    //if there is the item, add to inventory, delete from room's item list
    //if there is not, tell the user there is no such item
    _take(itemName) {
        if (this._currentRoom.items) {
            var itemIndex = this._currentRoom.items.indexOf(itemName);
            if (itemIndex > -1) {
                this._inventory.push(itemName);
                this._currentRoom.items.splice(itemIndex, 1);
                return itemName + " added to inventory.";
            }
        }
        return "There are no " + itemName + " in this room to take.";
    }

    //handles user's go command
    //if there is a room in user's direction, change currentRoom to be the exit room and show the description there
    //if there is not, tell the user there is no exit in such direction
    _move(direction) {
        if (this._currentRoom.exits && this._currentRoom.exits[direction]) {
            this._currentRoom = this._findObjectInArrayOfObjects(this._currentRoom.exits[direction].id, this._rooms, "id");
            return this._currentRoom.description;
        } else {
            return "No room could be found in that direction.";
        }
    }

    //handles user's use command
    //if the item's in inventory and the item has effects in current room, show the effect description and move to next room
    //if the item cannot be used, show the corresponding error
    _use(itemName) {
        var itemInventoryIndex = this._inventory.indexOf(itemName);
        var itemInUses = this._findObjectInArrayOfObjects(itemName, this._currentRoom.uses, "item");
        if (itemInventoryIndex > -1 && itemInUses != -1 && !itemInUses.effect.consumed) {
            itemInUses.effect.consumed = true;
            this._currentRoom = this._findObjectInArrayOfObjects(itemInUses.effect.goto, this._rooms, "id");
            this._inventory.splice(itemInventoryIndex, 1);
            return itemInUses.description + "\n" + this._currentRoom.description;
        } else if (itemInventoryIndex > -1 && itemInUses != -1) {
            return "You have used " + itemName + " effects already.";
        } else if (itemInventoryIndex > -1) {
            return "You cannot use " + itemName + " here."
        } else {
            return "You do not have " + itemName + ".";
        }
    }

    //given an array of objects,
    //return the object with the target value(targetValue) in the specific property(propertyName)
    //if there is no such object, return -1
    _findObjectInArrayOfObjects(targetValue, array, propertyName) {
        if (array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][propertyName] == targetValue) {
                    return array[i];
                }
            }
        }
        return -1;
    }

    //returns invalid command message
    _invalidMessage() {
        return "Invalid command";
    }

    //add the game status in the beginning of an output
    //"n" means no result
    //"l" means lose
    //"w" means win
    _addStatus(output) {
        if(this._currentRoom.status == undefined) {
            return "n" + output;
        } else if(this._currentRoom.status  == "lost"){
            return "l" + output;
        } else {
            return "w" + output;
        }
    }

    //returns the start message,
    startMessage() {
        return this._currentRoom.description;
    }

    //given the command of user, process the command and returns the output
    processAnswer(answer){
        var output;
        if (answer.substring(0,2) == 'go') {
            output = this._move(answer.substring(3));
        } else if (answer == 'inventory') {
            output = this._printInventory();
        } else if (answer.substring(0,4) == 'take') {
            output = this._take(answer.substring(5));
        } else if (answer.substring(0,3) == 'use') {
            output = this._use(answer.substring(4));
        } else {
            output = this._invalidMessage();
        }
        return this._addStatus(output);
    }

}

module.exports = nork_logic;