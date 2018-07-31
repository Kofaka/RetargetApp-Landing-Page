(function(){
  var maxBlur = 0.5;
  var headerLinksBlockModifier = 'landing__header__navbar_smaller';
  var headerLinksItemModifier = 'landing__header__navbar__list__item_show';

  var $windowHeight = $(window).height();
  var $windowWidth = $(window).width();
  var $headerImage = $('.landing__header__background-image');
  var $headerLinksBlock = $('.landing__header__navbar');
  var $headerRunCampaign = $('.js-landing__header__navbar__list__item_run-campaign');
  var $headerWatchVideo = $('.js-landing__header__navbar__list__item_watch-video');
  var $headerLoginButton = $('.js-landing__header__navbar__list__item_login-shopify');
  var $heroshotImage = $('.landing__heroshot__background-image');
  var $heroshotScrollMoreButton = $('.landing__heroshot__subsection_scroll-for-more a');
  var $heroshotScrollMoreButtonDesktop = $('.js-scroll-for-more-desktop');
  var $heroshotScrollMoreButtonMobile = $('.js-scroll-for-more-mobile');
  var $heroshotWatchVideo = $('.js-landing__heroshot__button_watch-video');
  var $heroshotRunCampaign = $('.js-landing__heroshot__button_run-campaign');
  var $collectorOptionsListInput = $('.landing__section__checkbox-list__item input');
  var $collectorOptionsListLabel = $('.landing__section__checkbox-list__item label');
  var customPlatformBox = '.landing__section__checkbox-list__item.landing__section__checkbox-list__item_custom';
  var customPlatformBoxlabel = '.landing__section__checkbox-list__item.landing__section__checkbox-list__item_custom label';
  var $customPlatformCheckbox = $('input[name=platformList]#custom');
  var $customPlatformInput = $('.landing__section__checkbox-list__item_custom__input');
  var $customPlatformSuccessMessage = $('.landing__section__email-collector__label__success-message_not-in-list');
  var $customPlatformErrorMessage = $('.landing__section__checkbox-list__item_custom__error-message');
  var $collectorOptions = $('input[name=platformList]');
  var $collectorInputBox = $('.landing__section__email-collector');
  var $collectorInput = $('#emailInput');
  var $collectorSend = $('#sendEmail');
  var $collectorTitle = $('.landing__section__email-collector__label__title');
  var $collectorSuccessMessage = $('.landing__section__email-collector__label__success-message');
  var $collectorErrorMessage = $('.landing__section__email-collector__label__error-message');

  var $firstSectionWatchVideo = $('.js-landing__section__button_watch-video');
  var $lastSectionRunCampaign = $('.js-landing__section__button_run-campaign');

  // Heroshot animation start
    $(document).scroll(function() {
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      var blurValue = '-webkit-filter: blur(' + countBlurSize() + '); filter: blur(' + countBlurSize() + ')';

      $heroshotImage.attr('style', blurValue);
      $headerImage.attr('style', blurValue);

      function roundTwoDecimal(value) {
        var result = Math.round(value * 100) / 100;
        return result;
      }

      function countScrolledHeight() {
        var blurRatio = (scrolled < $windowHeight) ? roundTwoDecimal( scrolled / $windowHeight ) : 1;
        return blurRatio;
      };

      function countBlurSize() {
        var scrolledHeight = countScrolledHeight();
        var blurSize = roundTwoDecimal( maxBlur * scrolledHeight );
        return blurSize + 'em';
      };

      (function modifyHeaderOnScroll() {
        (scrolled > 45 && $windowWidth >= 768)
          ? $headerLinksBlock.addClass(headerLinksBlockModifier)
          : $headerLinksBlock.removeClass(headerLinksBlockModifier);

        // Show link "Run Retargeting Campaig" in header after button
        // "Run My First Campaign" in ".landing__heroshot" was scrolled out
        ( ($windowHeight - scrolled) <= ($windowHeight * 0.48) && $windowWidth >= 768 )
          ? $headerRunCampaign.addClass(headerLinksItemModifier)
          : $headerRunCampaign.removeClass(headerLinksItemModifier);

        // Show link "Watch Video" in header after button "Watch Video"
        // in ".landing__section" was scrolled out
        ( ($windowHeight - scrolled) <= ($windowHeight * -0.48) && $windowWidth >= 768 )
          ? $headerWatchVideo.addClass(headerLinksItemModifier)
          : $headerWatchVideo.removeClass(headerLinksItemModifier);

        ( ($windowHeight - scrolled) <= ($windowHeight * 0.99) && $windowWidth >= 768 )
          ? $heroshotScrollMoreButton.fadeOut( 150 )
          : $heroshotScrollMoreButton.fadeIn( 500 );
      })();
    });
  // Heroshot animation end

  // "Scroll to Find More" animation start
    $(function() {
      $heroshotScrollMoreButtonDesktop.hide();
      $heroshotScrollMoreButtonMobile.hide();

      ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
      ? $heroshotScrollMoreButtonMobile.show()
      : $heroshotScrollMoreButtonDesktop.show();

      $heroshotScrollMoreButton.click(function() {
        $('html, body').animate({
          scrollTop: $(this.hash).offset().top
        }, 300);
        return false;
      });
    });
  // "Scroll to Find More" animation end


  // Set autoplay video on open Modal start
    (function autoPlayYouTubeModal(){
      $("body").find('[data-toggle="modal"]').click(function() {
        var theModal = $(this).data( "target" );
        var videoSRC = $(this).attr( "data-theVideo" );
        var videoSRCauto = videoSRC+"?autoplay=1";

        $(theModal+' iframe').attr('src', videoSRCauto);

        $('#watchVideoModal').on('hidden.bs.modal', function () {
          $(theModal+' iframe').attr('src', videoSRC);
        });
      });
    })();
  // Set autoplay video on open Modal end


  // Email collector form start
    hideInputBox();

    function showInputBox() {
      $collectorInputBox.show();
      $collectorTitle.show();
      $collectorInput.show();
      $collectorSend.show();
    };

    function hideInputBox() {
      $collectorSuccessMessage.hide();
      $collectorErrorMessage.hide();
      $customPlatformSuccessMessage.hide();
      $customPlatformErrorMessage.hide();
      $collectorTitle.hide();
      $collectorInput.hide();
      $collectorSend.hide();
    }

    function validateEmail(value) {
      var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
      return filter.test(value);
    };

    function clearCollector() {
      hideInputBox();
      $collectorOptions.attr({'checked': false});
      $customPlatformInput.val('');
      $collectorInput.val('');
    };

    function showEmailError() {
      $collectorTitle.hide();
      $collectorErrorMessage.show();
      $collectorInputBox.addClass('error');
    };

    function hideEmailError() {
      $collectorTitle.show();
      $collectorErrorMessage.hide();
      $collectorInputBox.removeClass('error');
    };

    function showCustomPlatformError() {
      $customPlatformErrorMessage.show();
      $(customPlatformBox).addClass('error');
    };

    function hideCustomPlatformError() {
      $customPlatformErrorMessage.hide();
      $(customPlatformBox).removeClass('error');
    };

    function sendEmail(e) {
      e.preventDefault();

      var customPlatformInputValue = $customPlatformInput.val();
      var customPlatformInputLength = $customPlatformInput.val().length;

      var data = {
        email: $collectorInput.val().trim().toLowerCase(),
        platform: ( $('input[name=platformList]:checked').val() !== 'custom' )
                  ? $('input[name=platformList]:checked').val()
                  : customPlatformInputValue
      };

      hideEmailError();
      hideCustomPlatformError();

      if ( validateEmail(data.email) && !$customPlatformCheckbox.prop('checked')
           || validateEmail(data.email) && customPlatformInputLength > 1 ) {

        hideInputBox();

        ( customPlatformInputLength > 1 )
        ? $customPlatformSuccessMessage.show()
        : $collectorSuccessMessage.show();

        setTimeout( clearCollector , 5000 );

        $.ajax({
          type: 'POST',
          url: '/collect-email',
          data: JSON.stringify(data),
          dataType: 'json'
        });

      } else if ( !validateEmail(data.email) && $customPlatformCheckbox.prop('checked') && customPlatformInputLength <= 1 )  {
        showEmailError();
        $collectorInput.on('focus', hideEmailError);

        showCustomPlatformError();
        $customPlatformInput.on('focus', hideCustomPlatformError);
        $collectorInput.on('focus', hideCustomPlatformError);

      } else if ( !validateEmail(data.email) && !$customPlatformCheckbox.prop('checked')
                  || !validateEmail(data.email) && customPlatformInputLength > 1 ) {
        showEmailError();
        $collectorInput.on('focus', hideEmailError);

      } else if ( validateEmail(data.email)
                  && $customPlatformCheckbox.prop('checked')
                  && customPlatformInputLength <= 1 )  {
        showCustomPlatformError();
        $customPlatformInput.on('focus', hideCustomPlatformError);
      };
    };

    function checkSelectedOption(target, targetCustom) {
      target.click( function(){
        var $that = $(this);

        if( $that.is( targetCustom ) ) {
          $customPlatformCheckbox.prop('checked', true);
          $collectorInput.blur();
          $customPlatformInput[0].focus();
        } else {
          $collectorInput.focus();
          $customPlatformInput[0].blur();
        }

        showInputBox();
      });
    };

    checkSelectedOption($collectorOptionsListInput, $customPlatformCheckbox);
    checkSelectedOption($collectorOptionsListLabel, customPlatformBoxlabel);

    $collectorSend.click( sendEmail );
  // Email collector form end

  // Google events start
    function initGoogleEvent(eventTarget, eventCategoryName, eventActionName, eventLabelName) {
      eventTarget.click(function() {
       sendGAEvent(eventCategoryName, eventActionName, eventLabelName);
      });
    }

  /**
   * Send event to GA
   * @param eventCategoryName {string}
   * @param eventActionName {string}
   * @param eventLabelName {string}
   */
    function sendGAEvent(eventCategoryName, eventActionName, eventLabelName) {
      if (window.ga) {
        ga('send', {
          hitType: 'event',
          eventCategory: eventCategoryName,
          eventAction: eventActionName,
          eventLabel: eventLabelName
        });
      }
    }

    function initGoogleEventVideos(eventTarget, eventLabelName) {
      initGoogleEvent(eventTarget, 'Videos', 'play', eventLabelName)
    }

    function initGoogleEventCTA(eventTarget, eventLabelName) {
      initGoogleEvent(eventTarget, 'CTA', 'clickButton', eventLabelName)
    }

    initGoogleEvent($headerLoginButton, 'Login', 'clickButton', 'Landing - Header - "Login via Shopify"');

    initGoogleEvent($heroshotScrollMoreButton, 'Scroll', 'clickButton', 'Landing - Heroshot - "Scroll to Find More"');

    initGoogleEventVideos($headerWatchVideo, 'Landing - Header - "Watch Video"');

    initGoogleEventVideos($heroshotWatchVideo, 'Landing - Heroshot - "Watch Video"');

    initGoogleEventVideos($firstSectionWatchVideo, 'Landing - First section - "Watch Video"');

    initGoogleEventCTA($headerRunCampaign, 'Landing - Header - "Run Retargeting Campaign"');

    initGoogleEventCTA($heroshotRunCampaign, 'Landing - Heroshot - "Run My First Campaign"');

    initGoogleEventCTA($lastSectionRunCampaign, 'Landing - Last Section - "Run My First Campaign"');
  // Google events end

  // Progress bar start
    function playRunnerAndGoHome() {
      var duration = 5000;
      var maxWidth = 100;
      var step = maxWidth/duration;
      var start = Date.now();

      var timer = setInterval(function() {
        var timePassed = Date.now() - start;

        if (timePassed > (duration+1)) {
          clearInterval(timer);
          window.location.href = window.location.protocol + '//' + window.location.hostname;
          return
        }

        draw( timePassed );
      }, 0);

      function draw( timePassed ) {
        var increaseWidth = (Math.round( timePassed * step * 100) / 100) + '%';
        $('.error-page__progress-bar__runner').css('width', increaseWidth);
      };
    };

    if( $('body').hasClass('error-page') ) {
      playRunnerAndGoHome();
    };

    $('a.partner-badge_click-action').on('click', function (e) {
      var placement = $(this).data('placement');

      sendGAEvent('Button', 'clickButton', createEventName(placement));

      function createEventName(placement){
        switch (placement){
          case 'heroshot-bottom':
            return 'Landing - Heroshot - FB Marketing Badge ';
            break;
          case 'footer':
            return 'Landing - Footer - FB Marketing Badge';
            break;
          default:
            return 'Landing - FB Marketing Badge';
            break;
        }
      }

    });

  // Progress bar end

})();
