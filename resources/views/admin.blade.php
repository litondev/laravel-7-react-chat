<!DOCTYPE html>
<html>
	<head>
		<script>
			(function(){
				let theLaravel = Object.freeze({
					base_url : "{{ url('/') }}",
					csrf_token : "{{ csrf_token() }}",
					is_login : "{{ auth()->user() ? 1 : 0 }}",
					is_mobile : "{{ config('app.isMobile') ? 1 : 0 }}"
				});

				window.laravel = theLaravel;
			})();
		</script>
	</head>
<body
	style="margin:0px">
	<div id="app"></div>
	<script src="{{asset('assets/js/admin.js')}}"></script>
</body>
</html>