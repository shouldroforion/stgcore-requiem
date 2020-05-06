const url = new URL(window.location.href);

// Format: https://stoictechgroup.com/?link=redirect
const link = url.searchParams.get("link");

switch (link) {

  // Member portal: home page.
  case 'redirect':
  default:
    window.location = `https://alb1.stoictechgroup.com/requiem/`;
}
