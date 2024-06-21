<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    <script>
        if ('{{app()->environment()}}' == 'production') {
            const links = document.querySelectorAll("link");
            const scripts = document.querySelectorAll("script")

            for (let script of scripts) {
                if (script.src.startsWith('http://')) {
                    // Replace http with https
                    const newScript = document.createElement('script');

                    // Set the new src with https
                    newScript.src = script.src.replace('http://', 'https://');

                    // Copy other attributes from the old script element if needed
                    newScript.async = script.async;
                    newScript.defer = script.defer;
                    newScript.type = script.type;

                    // Replace the old script element with the new one
                    script.parentNode.replaceChild(newScript, script);
                }
            }

            for (let link of links) {
                if (link.href.startsWith('http://')) {
                    // Replace http with https
                    const newLink = document.createElement('link');

                    // Set the new href with https
                    newLink.href = link.href.replace('http://', 'https://');

                    // Copy other attributes from the old link element if needed
                    newLink.async = link.async;
                    newLink.defer = link.defer;
                    newLink.type = link.type;

                    // Replace the old link element with the new one
                    link.parentNode.replaceChild(newLink, link);
                }
            }
        }
    </script>
    @inertia
</body>

</html>