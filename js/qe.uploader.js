var Uploader = {
	maxFile:  10,
	uploader: 'upload.php',
	formId:   0,
	init: function()
	{
		that = undefined;
		$('.fileUpload').bind('change', this.setFiles);
		$('.fileUploadButton').bind('click', this.setUpload);
	},
	setUpload: function()
	{
		formId = this.parentNode.parentNode.id;

		files = $('#' + formId + ' .fileUpload');

		for (var i = 0; i < files[0].files.length; ++i) {
			var data = new FormData();

			$.each(files[0].files, function(key, value)
			{
				if (key == i) {
					data.append(key, value);
				}
			});

			Uploader.upload(data, formId, i);
		}

		return false;
	},
	upload: function(data, formId, i)
	{
		console.log(formId, i)
		var proc        = $('#' + formId + ' .queueElement')[i],
			percentage  = proc.children[0];
			progressBar = proc.children[2].children[0];
			console.log(progressBar, formId, i);
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
						progress = Math.round(ev.loaded * 100 / ev.total);
						percentage.innerText = progress.toString() + '%';
						progressBar.style.width = progress + '%';
					}, false);
				}
				return req;
			}
		});

		request.done(function(msg) {
			$('#log').html(msg);
		});


		/*request.fail(function(jqXHR, textStatus) {
			alert('Request failed: ' + textStatus);
		});*/
	},
	setFiles: function(e)
	{
		this.formId           = this.parentNode.parentNode.id,
			cloneQueueElement = $('#' + this.formId + ' .queueElement').clone();

		$('#' + this.formId + ' .queue .queueElement').remove('.queueElement');

		for (var i = 0; i < this.files.length; ++i) {
			cloneQueueElement[0].children.item(0).innerText = '0%';
			cloneQueueElement[0].children.item(1).innerText = this.files[i].name;
			$('#' + this.formId + ' .queue').append(cloneQueueElement[0].outerHTML);
		}

		$('#' + this.formId + ' .queue').show();

		return true;
	}
};