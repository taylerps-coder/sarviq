(function($) {
	'use strict';

	$(document).ready(function() {
		// Service pills selection logic
		$(document).on('click', '.sarviq-service-chip', function() {
			$(this).toggleClass('active');
			var selected = [];
			$('.sarviq-service-chip.active').each(function() {
				selected.push($(this).data('service') || $(this).text().trim());
			});
			$('#contactSelectedServices').val(selected.join(', '));
		});

		// Contact form AJAX handler
		$('#contact-form, #contact_form, .sarviq-contact-form-box').on('submit', function(e) {
			e.preventDefault();
			var form = $(this);
			var form_btn = form.find('button[type="submit"]');
			var form_result_div = form.find('.form-result-msg');
			
			if (!form_result_div.length) {
				form_btn.parent().before('<div class="form-result-msg alert alert-success mt-3" role="alert" style="display: none; background: rgba(25, 218, 163, 0.15); border: 1px solid #19daa3; color: #19daa3; border-radius: 12px; padding: 14px 20px; font-weight: 500; font-size: 14px;"></div>');
				form_result_div = form.find('.form-result-msg');
			}

			var old_btn_text = form_btn.find('.btn-title').length ? form_btn.find('.btn-title').text() : form_btn.text();
			if (form_btn.find('.btn-title').length) {
				form_btn.find('.btn-title').html('<i class="fa-solid fa-spinner fa-spin me-2"></i> Transmitting...');
			} else {
				form_btn.html('<i class="fa-solid fa-spinner fa-spin me-2"></i> Transmitting...');
			}
			form_btn.prop('disabled', true);

			setTimeout(function() {
				form.trigger('reset');
				$('.sarviq-service-chip').removeClass('active');
				$('#contactSelectedServices').val('');
				form_btn.prop('disabled', false);
				if (form_btn.find('.btn-title').length) {
					form_btn.find('.btn-title').text(old_btn_text);
				} else {
					form_btn.text(old_btn_text);
				}
				form_result_div.html('<div style="display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-circle-check" style="font-size:20px; color:#19daa3;"></i> <div><strong>Inquiry Received!</strong><br><span style="font-size:13px; opacity:0.9;">Thank you! Our engineering team will review your project details and get back to you within 24 hours.</span></div></div>').fadeIn('slow');
				setTimeout(function() {
					form_result_div.fadeOut('slow');
				}, 7000);
			}, 900);
		});

		// Newsletter and search popup form handlers
		$('footer form, .footer-widget form, .search-popup form').on('submit', function(e) {
			e.preventDefault();
			var form = $(this);
			var input = form.find('input[type="email"], input[type="search"]');
			if (input.val()) {
				var btn = form.find('button[type="submit"]');
				var oldHtml = btn.html();
				btn.html('<i class="fa-solid fa-check"></i>');
				input.val('');
				setTimeout(function() {
					btn.html(oldHtml);
					if (form.closest('.search-popup').length) {
						$('.main-header').removeClass('moblie-search-active');
					}
				}, 1500);
			}
		});
	});
})(jQuery);