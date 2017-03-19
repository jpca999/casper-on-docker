var casper=require('casper').create({
    verbose:true,
    logLevel:'error',
    pageSettings:{
        loadImages:false,
        loadPlugins:false
    },
    clientScripts:["plugins/jquery.js","plugins/lodash.js"]
});

var fs=require('fs');
var url='http://www.realtor.com/realestateandhomes-search/Mountain-View_CA';

var photolinks=[];
var pricelist=[];
var getstreetAddresss=[];
var getmetasqfts=[];
var addressLocality=[];
var addressRegion=[];
var postalCode=[];
var noofbeds=[];
var noofbaths=[];
var arr_kindOfHome=[]; 

var output=[];

function outputJSON(){
    output.push({
        arr_kindOfHome: arr_kindOfHome,
        photolinks: photolinks,
        pricelist: pricelist,
        getstreetAddresss: getstreetAddresss,
        getmetasqfts: getmetasqfts,
        addressLocality: addressLocality,
        addressRegion: addressRegion,
        postalCode: postalCode,
        noofbeds: noofbeds,
        noofbaths: noofbaths,
    });
    return JSON.stringify(output);
};

function getphoto(){
  var names=$('[data-label=property-photo] a');
  return _.map(names, function(e){
    return e.getAttribute('href');
  });
};

function getprice(){
  var names=$('[data-label=property-price] span');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getstreetAddress(){
  // var names=$('[itemprop=streetAddress]');
  var names=$('span.listing-street-address');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getmetasqft(){
  var names=$('[data-label=property-meta-sqft] span');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getaddresslocality(){
  // var names=$('[itemprop=addressLocality]');
  var names=$('span.listing-city');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getaddressreason(){
  // var names=$('[itemprop=addressRegion]');
var names=$('span.listing-region');  
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getpostalcode(){
  // var names=$('[itemprop=postalCode]');
  var names=$('span.listing-postal');

  return _.map(names, function(e){
    return e.innerHTML;
  });
};


function getkindOfHome(){
  // var names=$('[itemprop=postalCode]');
  var names=$('.srp-property-type');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getnoofbeds(){
  var names=$('[data-label=property-meta-beds] span');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getnoofbaths(){
  var names=$('[data-label=property-meta-baths] span');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};


casper.start(url, function(){
    this.echo(this.getTitle());
});

casper.waitForSelector('[data-label=property-price]',function(){
    console.log('selector is loaded');
});

casper.then(function(){
// this.evaluate(alltest);
    photolinks=this.evaluate(getphoto);
    pricelist=this.evaluate(getprice);
    getstreetAddresss=this.evaluate(getstreetAddress);
    addressLocality=this.evaluate(getaddresslocality);
    addressRegion=this.evaluate(getaddressreason);
    postalCode=this.evaluate(getpostalcode);
    noofbeds=this.evaluate(getnoofbeds);
    noofbaths=this.evaluate(getnoofbaths);
    getmetasqfts=this.evaluate(getmetasqft);
    arr_kindOfHome=this.evaluate(getkindOfHome);
    this.echo( 'arr_kindOfHome =');
    this.echo(arr_kindOfHome);    


});

casper.then(function(){
    this.echo(photolinks.length +'links found');

});

casper.run(function(){
    var data=outputJSON();
    
    this.echo(' before writign to file found');

    this.echo(data);

    fs.write('data.json',data,'w');
    this.echo("\n Done").exit();
});


















