$.Carousel = function (el) {
  this.$el = $(el);
  this.$ul = this.$el.find('ul');
  this.activeIdx = 0;
  this.$ul.children(':first').addClass('active');
  this.next().addClass('next');
  this.prev().addClass('prev');
  this.bindEvents();
  this.transitioning = false;
};

$.Carousel.prototype.bindEvents = function() {
  var $slideLeft = this.$el.children(".slide-left");
  var $slideRight = this.$el.children(".slide-right");
  var that = this;

  $slideLeft.on("click", function(event) {
    that.slide.call(that, that.increaseIdx.bind(that), "next", "prev");
  });

  $slideRight.on("click", function(event) {
    that.slide.call(that, that.decreaseIdx.bind(that), "prev", "next");
  });
}

$.Carousel.prototype.slide = function (changeIdx, newActive, newDeleted) {
  event.preventDefault();

  if(this.transitioning) {
    return;
  }

  this.transitioning = true;
  var that = this;
  eval("this." + newDeleted + "()").removeClass(newDeleted);
  eval("this." + newDeleted + "()").removeClass('active');
  // this.activeLi().addClass(newDeleted);
  eval("this." + newActive + "()").addClass('active');

  setTimeout(function () {
    that.activeLi().addClass(newDeleted);
    eval("that." + newActive + "()").removeClass(newActive);
    changeIdx();
    eval("that." + newActive + "()").addClass(newActive);

    eval("that." + newDeleted + "()").one("transitionend", function(){
      eval("that." + newDeleted + "()").removeClass('active');
      that.transitioning = false;
    });
  }, 0);

};

$.Carousel.prototype.activeLi = function () {
  return this.$ul.children('li').eq(this.activeIdx);
};

$.Carousel.prototype.prev = function () {
  return this.$ul.children('li').eq(this.oneLess());

};

$.Carousel.prototype.next = function () {
  return this.$ul.children('li').eq(this.oneMore());
};

$.Carousel.prototype.decreaseIdx = function () {
  if (this.activeIdx < 1) {
    this.activeIdx = this.$ul.children('li').length + this.activeIdx - 1;
  } else {
    this.activeIdx--;
  }
};

$.Carousel.prototype.oneLess = function () {
  if (this.activeIdx < 1) {
    return this.$ul.children('li').length + this.activeIdx - 1;
  } else {
    return this.activeIdx - 1;
  }
};

$.Carousel.prototype.increaseIdx = function () {
  this.activeIdx++;
  this.activeIdx %= this.$ul.children('li').length;
};


$.Carousel.prototype.oneMore = function () {
  var oneMore = this.activeIdx + 1;
  return oneMore % this.$ul.children('li').length;
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};