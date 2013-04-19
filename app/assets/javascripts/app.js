

App = Ember.Application.create({
   LOG_TRANSITIONS: true
});

App.ApplicationView = Ember.View.extend({
  templateName: 'app',
  PreviewImage: null,
  width: 800,
  height: 400,
  show: false
});

App.ApplicationController = Ember.Controller.extend({
});

App.Router.map(function() {
  this.route("show", { path: "/view" });
});

App.Item = Ember.Object.extend({
  id: null,
  url: null,
  name: null
});

App.Items = Ember.ArrayProxy.create({
  content: Em.A(),
  getBlock: function() {
    items = [];
    for(i=0; i<4;i++) {
      if(this.content.length != 0) {
        index = Math.floor(Math.random() * this.content.length);
        items[i] = this.content.objectAt(index);
        this.content.removeAt(index);
      }
    }
    items_sorted = items.sort(function(a,b) {
      return a.get('orientation') < b.get('orientation');
    });
    return items_sorted;
  }
});
answerItems = Ember.ArrayProxy.extend ({
  content: Em.A(),

  items: function() {
    return (this.content.length > 0);
  }.property('content.length'),

  more: function() {
    return (this.content.length < 3);
  }.property('content.length'),

  tryAddObject: function(obj) {
    if(this.content.length < 3) 
      this.addObject(obj);
  },
  reset: function() {
    this.clear();
  }
});

App.AnswerItems = answerItems.create();


App.Items.content.pushObject(App.Item.create({name: "Item 1", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417190919832_0002.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 2", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417190919832_0004.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417190919832_0005.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417190919832_0006.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417190919832_0007.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191114700_0001.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191114700_0002.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191114700_0003.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191114700_0004.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191114700_0005.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191114700_0006.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191114700_0007.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191114700_0008.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191114700_0009.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191114700_0010.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191241552_0001.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191241552_0002.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191241552_0003.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191241552_0004.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191241552_0005.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191241552_0006.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191241552_0007.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191241552_0008.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191241552_0009.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191241552_0010.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191241552_0011.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191241552_0012.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191241552_0013.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0001.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0002.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0003.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0004.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0005.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0006.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0007.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0008.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0009.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0010.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0011.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0012.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0013.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0014.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0015.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191422271_0016.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191453475_0001.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191453475_0002.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191453475_0003.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191453475_0004.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'https://s3-us-west-2.amazonaws.com/soularium/20130417191453475_0005.jpg', orientation: 'p'}));
App.IndexRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('index');

    this.render('grid', {
       into:'index', //template name
       outlet: 'grid', //named outlet
       controller: 'grid' //controller you want to use
   });
   this.render('selected', {
       into:'index',
       outlet: 'selected',
       controller: 'selected'
   });
   this.render('zoom', {
      into: 'index',
      outlet: 'zoom'
   });
  }
});

App.IndexView = Ember.View.extend({
  templateName: 'index'
});

App.GridController = Ember.Controller.extend({
  slides: function() {
    slide_data = [],
    length = Math.ceil(App.Items.content.length/4);
    for(var i=0; i<length; i++) {
      slide_data[i] = App.Items.getBlock();
      classString = "";
      for(var j=0; j<slide_data[i].length; j++) {
        classString += slide_data[i][j].orientation;    
        slide_data[i][j].class = "image-"+(j+1);
        slide_data[i][j].containerClass = 'image-outer'+(j+1);
      }
      for(var j=0; j<slide_data[i].length; j++) {
        slide_data[i][j].class = classString+" "+slide_data[i][j].class;
        slide_data[i][j].containerClass = classString+" "+slide_data[i][j].containerClass;
      }
    }
    return slide_data;
  }.property('App.Items')
});

App.SelectedController = Ember.Controller.extend({
  bottomTransition: '0px',
  toggleContainer: function() {
    $('#selected-container').animate({bottom: this.bottomTransition}, 500);
    if(this.bottomTransition == '0px') {
      this.bottomTransition = '-162px';
      App.set('show', true);
    }
    else {
      this.bottomTransition = '0px';
      App.set('show', false);
    }
  },
  viewSelection: function() {
    this.transitionToRoute('show')
  },
  resetSelection: function() {
    App.AnswerItems.reset();
  }
});

App.GridView = Ember.View.extend({
  didInsertElement:function() {
    App.set('show',false);
    //calculate screen size
    width = $(window).width();
    height = $(window).height();
    App.set('width', width);
    App.set('height', height);
    left = 15;
    if(width/height > 1.4) {    //height is the limiting factor
      _width = height*1.4 + 50;
      left = (width-_width)/2 + 15; //15 offsets the padding
      style = ".iosSlider{height:"+height+"px; width:"+_width+"px;left:"+left+"px;} .iosSlider .slider .slide {height:"+height+"px; width:"+_width+"px;}"
      $("style").append(style);

    }
    else {    //width is the limiting factor
      height = width/1.4;
      style = ".iosSlider{height:"+height+"px; width:"+width+"px;} .iosSlider .slider .slide {height:"+height+"px; width:"+width+"px;}"
      $("style").append(style);
    }
    $('.iosSlider').iosSlider({
      snapToChildren: true,
      scrollbar: false,
      tabToAdvance: true,
      keyboardControls: true,
      desktopClickDrag: true,
      stageCSS: {left: left, top:'10px'},
      mode: 'html5',
      //onSlideChange: changeSlideIdentifier
    });

    // $('.iosSlider').width($(window).width() - 40);
    // $('.iosSlider .slider .slide ').width($(window).height() - 40);
    // $('.iosSlider').height($(window).height() - 40);
    // $('.iosSlider .slider .slide ').height($(window).height() - 40);
  }

  // scroll: function(evt) {
  //   alert("ClickableView was clicked!");
  // }
});

App.ItemView = Ember.View.extend({
  templateName: 'item-partial',
  willInsertElement: function() {
    this.set('item', this._context);
  },
  click: function() {
    App.set('PreviewImage', this.item);
    $('#item-zoom').slideDown();
  }
});

App.ZoomView = Ember.View.extend({
  click: function() {
    $('#item-zoom').slideUp();
  },
  drag: function() {
    $('#item-zoom').slideUp();
  },
  touchMove: function() {
    $('#item-zoom').slideUp();
  }
});

App.ZoomController = Ember.Controller.extend({
  addSelection: function() {
    App.AnswerItems.tryAddObject(App.PreviewImage);
  },
  close: function() {
    $('#item-zoom').slideUp();
  }
});

App.ShowView = Ember.View.extend({

  didInsertElement: function() {
    playlist = [];
    for(i=0; i<App.AnswerItems.content.length; i++) {
      console.log(App.AnswerItems[i])
      playlist[i] = new Object;
      playlist[i].title = App.AnswerItems.content[i].name;
      playlist[i].image = App.AnswerItems.content[i].href;
      playlist[i].description = "PHHT WHATEVER";
    }

    CoverFlowTest = playlist;
    if(App.AnswerItems.content.length > 0) {
      $('#coverflow').coverflow({
        width: App.width,
        height: App.height*0.9,
        coverwidth: App.width/2,
        coverheight: App.height/2,
        backgroundopacity: 0,
        showtext: false,
        playlist: playlist
      })
    }
  }
})

App.ShowController = Ember.Controller.extend ({
  back: function() {
    this.transitionToRoute('index');
  },
  reset: function() {
    App.AnswerItems.reset();
    this.transitionToRoute('show')
  }
});