$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $("#" + this.$el.attr("data-content-tabs"));
  this.$activeTab = this.$contentTabs.children(".active");
  this.bindEvents();
};

$.Tabs.prototype.bindEvents = function () {
  var that=this;
  this.$el.on("click", "a", function(event) {
    that.clickTab(event);
  });
};

$.Tabs.prototype.activeLink = function () {
  return this.$el.find(".active");
};

$.Tabs.prototype.clickTab = function (event) {
  event.preventDefault();
  // console.log(this.$activeTab);
  var that = this;
  var newActiveLink = $(event.currentTarget);

  this.fadeOut();
  this.$activeTab.one("transitionend", function(event) {
    that.$activeTab.removeClass("transitioning");
    that.activeLink().removeClass("active");

    newActiveLink.addClass("active");
    that.$activeTab = that.$contentTabs.children(that.activeLink().attr("href"));
    that.$activeTab.addClass("active transitioning");
    // console.log(that.$activeTab);
    setTimeout( function(){
      that.$activeTab.removeClass("transitioning");
    }, 0)
  });

  // this.$oldActiveTab = this.$activeTab;
  // // setTimeout( function(){
  //   this.activeLink().removeClass("active");
  //   $(event.currentTarget).addClass("active");
  //    this.fadeIn();
  // }.bind(this), 500);
  // this.$el.
};

$.Tabs.prototype.fadeOut = function () {
  this.$activeTab.removeClass("active");
  // console.log(this.$activeTab);
  this.$activeTab.addClass("transitioning");
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};