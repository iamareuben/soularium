App = Ember.Application.create({
   LOG_TRANSITIONS: true
});

App.ApplicationView = Ember.View.extend({
  templateName: 'app',
  PreviewImage: null
});

App.ApplicationController = Ember.Controller.extend({
});

App.Item = Ember.Object.extend({
  id: null,
  url: null,
  name: null
});

App.Items = Ember.A();
App.AnswerItems = Ember.A();

App.Items.pushObject(App.Item.create({name: "Item 1", href: 'http://sphotos-d.ak.fbcdn.net/hphotos-ak-ash3/886342_436183656460956_702149449_o.jpg'}));
App.Items.pushObject(App.Item.create({name: "Item 2", href: 'http://sphotos-a.ak.fbcdn.net/hphotos-ak-frc1/882482_436183993127589_1618193570_o.jpg'}));
App.Items.pushObject(App.Item.create({name: "Item 3", href: 'http://sphotos-g.ak.fbcdn.net/hphotos-ak-frc1/830386_436184266460895_521886329_o.jpg'}));
App.Items.pushObject(App.Item.create({name: "Item 4", href: 'http://sphotos-d.ak.fbcdn.net/hphotos-ak-prn1/882499_436883773057611_953088772_o.jpg'}));
App.Items.pushObject(App.Item.create({name: "Item 5", href: 'http://sphotos-e.ak.fbcdn.net/hphotos-ak-ash3/892437_436883863057602_1813858880_o.jpg'}));
App.Items.pushObject(App.Item.create({name: "Item 6", href: 'http://sphotos-g.ak.fbcdn.net/hphotos-ak-prn1/885343_441018039310851_1761746740_o.jpg'}));

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
  _itemList: App.Items,
  slides: function() {
    items = [];
    for(var i=0; i<Math.ceil(this._itemList.length/4); i++) {
      items[i] = {first:this._itemList[i*4], second:this._itemList[i*4+1], third:this._itemList[i*4+2], fourth:this._itemList[i*4+3], };
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
  }
});

App.GridView = Ember.View.extend({
  didInsertElement:function() {
    console.log('redraw');
    //calculate screen size
    width = $(window).width();
    height = $(window).height()-20;
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
  item: null,
  willInsertElement: function() {
    this.set('item', this._context[this.pos]);
    console.log('done')
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