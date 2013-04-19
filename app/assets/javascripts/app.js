

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
  getNext: function(orientation) {
    obj = this.content.findProperty('orientation', orientation);
    this.content.removeObject(obj);
    return obj;
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


App.Items.content.pushObject(App.Item.create({name: "Item 1", href: 'http://sphotos-g.ak.fbcdn.net/hphotos-ak-prn1/17595_427046214041367_749533304_n.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 2", href: 'http://sphotos-h.ak.fbcdn.net/hphotos-ak-frc1/734641_436883716390950_1811006628_n.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'http://sphotos-g.ak.fbcdn.net/hphotos-ak-prn1/66066_10152310658095007_247127866_n.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 4", href: 'http://sphotos-h.ak.fbcdn.net/hphotos-ak-prn1/549804_410369552375700_1275537165_n.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 1", href: 'http://sphotos-e.ak.fbcdn.net/hphotos-ak-frc1/734496_398907580188564_79020889_n.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 2", href: 'http://sphotos-a.ak.fbcdn.net/hphotos-ak-ash4/224560_366990523380270_1548188573_n.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'http://sphotos-c.ak.fbcdn.net/hphotos-ak-ash3/559835_10151543417095955_102056623_n.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 4", href: 'http://sphotos-a.ak.fbcdn.net/hphotos-ak-ash4/264608_10150242924022636_2713679_n.jpg', orientation: 'p'}));
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
    items = [];
    _p = true;
    length = Math.ceil(App.Items.content.length/4);
    for(var i=0; i<length; i++) {
      items[i] = [];
      classString = "";
      for(var j=0; j<4; j++) {
        if(_p) {
          nextItem = App.Items.getNext('p');   
          if(nextItem)
            classString += 'p'
          else {
            classString += 'l'
            nextItem = App.Items.getNext('l');
            _p = false;
          }
        }
        else {
          classString += 'l'
          nextItem = App.Items.getNext('l');
        }
        if(nextItem) {
          nextItem.class = "image-"+(j+1);
          nextItem.containerClass = 'image-outer'+(j+1);
          items[i][j] = nextItem;
        }
      }
      for(var j=0; j<4; j++) {
        if(items[i][j]) {
          items[i][j].class = classString+" "+items[i][j].class;
          items[i][j].containerClass = classString+" "+items[i][j].containerClass;
        }
      }
    }
    return items;
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