var Uploader = {
	maxFile:  10,
	uploader: 'upload.php',
	formId:   0,

	/**
	 * Init
	 *
	 * @return void
	 */
	init: function()
	{
		that = undefined;
		$('.fileUpload').bind('change', this.setFiles);
		$('.fileUploadButton').bind('click', this.setUpload);
		$('.addForm').bind('click', this.clone);
	},

	/**
	 * Set upload event.
	 *
	 * @returns {Boolean}
	 */
	setUpload: function(){
		'use strict';

		var formId = this.parentNode.parentNode.id,
			files  = $('#' + formId + ' .fileUpload');

		for (var i = 0; i < files[0].files.length; ++i) {
			var data = new FormData();

			$.each(files[0].files, function(key, value){
				if (key == i) {
					data.append(key, value);
				}
			});

			Uploader.upload(data, formId, i);
		}

		return false;
	},

	/**
	 * Upload one file.
	 *
	 * @param data     Form data.
	 * @param formId   Form ID.
	 * @param i        Price.
	 *
	 * @retunr string   JSON object/HTML response
	 */
	upload: function(data, formId, i){
		'use strict';

		var proc        = $('#' + formId + ' .queueElement')[i],
			percentage  = proc.children[0];

		//show progress bar
		/*$uploadData = $form.parent();
		$uploadData.find('.progress').show();
		$progressBar = $uploadData.find('.progressBar');*/
		var request = $.ajax({
			cache: false,
			contentType: false,
			processData: false,
			type: 'post',
			url: Uploader.uploader,
			dataType: 'json',
			enctype: 'multipart/form-data',
			data: data,
			xhr: function() {
				var req = $.ajaxSettings.xhr();
				if (req) {
					req.upload.addEventListener('progress',function(ev){
						//Display progress Percentage
						var progress = Math.round(ev.loaded * 100 / ev.total);
						percentage.innerText = progress.toString() + '%';
						$('#' + formId + ' .progress')[i].style.width = progress + '%';
					}, false);
				}

				return req;
			}
		});

		request.done(function(msg){
			$('#' + formId + ' .imageBox').append('<div class="images"><img src="uploads/' + msg.image + '" width="150" /><br /><a href="#">Delete</a></div>');
			//console.log($('.images a').length);
			$('.images a').live(
				'click',
				Uploader.deleteFile()
			);
			//$('#log').html(msg);
		});

		/*request.fail(function(jqXHR, textStatus) {
			alert('Request failed: ' + textStatus);
		});*/
	},

	/**
	 * Set file and status bar.
	 *
	 * @param e   Event.
	 *
	 * @returns {Boolean}
	 */
	setFiles: function(){
		'use strict';

		this.formId = this.parentNode.parentNode.id;

		var cloneQueueElement = $('#' + this.formId + ' .queueElement').clone();

		$('#' + this.formId + ' .queue .queueElement').remove('.queueElement');

		for (var i = 0; i < this.files.length; ++i) {
			cloneQueueElement[0].children.item(0).innerText = '0%';
			cloneQueueElement[0].children.item(1).innerText = this.files[i].name;
			$('#' + this.formId + ' .queue').append(cloneQueueElement[0].outerHTML);
		}

		$('#' + this.formId + ' .queue').show();

		return true;
	},

	/**
	 * Delete file.
	 *
	 * @return sring   HTML response.
	 */
	deleteFile: function(){
		/*var request = $.ajax({
			cache: false,
			contentType: false,
			processData: false,
			type: 'post',
			url: Uploader.uploader,
			dataType: 'json',
			enctype: 'multipart/form-data',
			data: 'action=delete',
			xhr: function() {
				var req = $.ajaxSettings.xhr();
				if (req) {
					req.upload.addEventListener('progress',function(ev){
						//Display progress Percentage
						var progress = Math.round(ev.loaded * 100 / ev.total);
						percentage.innerText = progress.toString() + '%';
						$('#' + formId + ' .progress')[i].style.width = progress + '%';
					}, false);
				}

				return req;
			}
		});

		request.done(function(msg){
			$('#' + formId + ' .imageBox').append('<div class="images"><img src="uploads/' + msg.image + '" width="150" /><br /><a href="#">Delete</a></div>');
			//console.log(msg);
			//$('#log').html(msg);
		});*/
		alert(9);
	},

	clone: function(){
		console.log(111)
		thatt = this
		var that       = $(this);
			lastForm   = that.prev(),
			formNumber = parseInt(lastForm.attr('id').substr(13));

		that.after(that);
		that.next().id = 'uploaderForm-' + ++formNumber;

	}
};