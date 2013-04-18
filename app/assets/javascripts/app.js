

App = Ember.Application.create({
   LOG_TRANSITIONS: true
});

App.ApplicationView = Ember.View.extend({
  templateName: 'app',
  PreviewImage: null,
  width: 800,
  height: 400

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
App.AnswerItems = Ember.A();

App.Items.content.pushObject(App.Item.create({name: "Item 1", href: 'http://sphotos-g.ak.fbcdn.net/hphotos-ak-prn1/17595_427046214041367_749533304_n.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 2", href: 'http://sphotos-h.ak.fbcdn.net/hphotos-ak-frc1/734641_436883716390950_1811006628_n.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'http://sphotos-d.ak.fbcdn.net/hphotos-ak-prn1/882499_436883773057611_953088772_o.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 4", href: 'http://sphotos-h.ak.fbcdn.net/hphotos-ak-prn1/549804_410369552375700_1275537165_n.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 1", href: 'http://sphotos-e.ak.fbcdn.net/hphotos-ak-frc1/734496_398907580188564_79020889_n.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 2", href: 'http://sphotos-a.ak.fbcdn.net/hphotos-ak-ash4/224560_366990523380270_1548188573_n.jpg', orientation: 'p'}));
App.Items.content.pushObject(App.Item.create({name: "Item 3", href: 'http://sphotos-d.ak.fbcdn.net/hphotos-ak-prn1/189363_364686446944011_2050580924_n.jpg', orientation: 'l'}));
App.Items.content.pushObject(App.Item.create({name: "Item 4", href: 'http://sphotos-a.ak.fbcdn.net/hphotos-ak-frc1/882482_436183993127589_1618193570_o.jpg', orientation: 'l'}));
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
  show: false,
  toggleContainer: function() {
    $('#selected-container').animate({bottom: this.bottomTransition}, 500);
    if(this.bottomTransition == '0px') {
      this.bottomTransition = '-162px';
      this.set('show', true);
    }
    else {
      this.bottomTransition = '0px';
      this.set('show', false);
    }
  },
  viewSelection: function() {
    this.transitionToRoute('show')

  }
});

App.GridView = Ember.View.extend({
  didInsertElement:function() {
    console.log('redraw');
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
      stageCSS: {left: left, top:'10px'}
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
    App.AnswerItems.pushObject(App.PreviewImage);
  },
  close: function() {
    $('#item-zoom').slideUp();
  }
});

App.ShowView = Ember.View.extend({

  didInsertElement: function() {
    playlist = [];
    for(i=0; i<App.AnswerItems.length; i++) {
      console.log(App.AnswerItems[i])
      playlist[i] = new Object;
      playlist[i].title = App.AnswerItems[i].name;
      playlist[i].image = App.AnswerItems[i].href;
      playlist[i].description = "PHHT WHATEVER";
    }

    CoverFlowTest = playlist;
    if(App.AnswerItems.length > 0) {
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