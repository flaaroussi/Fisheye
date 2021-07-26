import FetchApi from "./FetchApi.js";
import Filter from "./pages/home/Filter.js";
import HomePage from "./pages/home/HomePage.js";


const fApi = new FetchApi();
fApi.fetchData().then(data => {
   const hPage = new HomePage();
   hPage.displayPhotographers(data);

   const filter = new Filter();
   filter.doFilter();
});

