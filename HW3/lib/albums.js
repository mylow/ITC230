'use strict'

let albums = [
    {   title: "waste", 
        artist:"barren", 
        release:2017 },
    
    {   title: "syre", 
        artist:"Jaden Smith", 
        release:2017},
    
    {   title: "unrendered", 
        artist:"Bones", 
        release:2017},
    
    {   title: "tiger", 
        artist:"Thaiboy Digital", 
        release:2014},
];

exports.get = (title) => {
    return albums.find((item) => {
        return item.title === title;
    });
};

exports.delete = (title) => {
    let oldLength = albums.length;
    var newAlbum = albums.filter((item) =>{
    return item.title !== title;    
    });
    albums = newAlbum;
    
    return { deleted: title, total: albums.length};    
}

exports.add = (newAlbum) => {
    var found = this.get(newAlbum.title);
    var newItem = [];
    newItem = [];   
    newItem ["title"] = newAlbum;
    if (!found) {
        albums.push(newItem);
    }
    var action = (found) ? newAlbum + " updated" : newAlbum + " added";
    return {"action": action, "total": albums.length };
}