var expect=require("chai").expect;
var album = require('../HW4/albums.js');

//search
describe("album", ()=>{
	it("returns requested album",()=>{
		var result=album.get("waste");
		expect(result).to.deep.equal({
		title: "waste", artist: "barren"
	  	});
	});		

	it("get fails w/ invalid album", ()=>{
		var result=album.get('none');
		expect(result).to.be.undefined;
	});
	
	//add

	it("adds requested album information", () => {
		var newalbum = {
			title: "waste", artist: "barren"};
		var result = album.add(newalbum);
		expect(result).to.deep.equal({
			"added": true, "total": 5});
	});
	
	it("add fails", ()=>{
		var result = album.add({
			title: "Gluee"
		});
		expect(result.added).to.be.false;
	});
	
	//delete
	it("deletes album information", ()=>
	   {
	   var result = album.delete("waste");
	expect(result).to.deep.equal({
		"deleted":true, "total": 4
	});
});
	
	it("unable to delete album", () =>{
	var result=album.delete("waste");
	expect(result).to.deep.equal({
		"deleted": false, "total": 5
	});
});
});