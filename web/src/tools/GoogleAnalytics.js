import ReactGA from 'react-ga';
ReactGA.initialize('UA-196401335-1');

export default function googleAnalistics (history) {
   if(window.location.hostname === 'ofertabest.com'){
      ReactGA.pageview(history.location.pathname + history.location.search);
   }else{
      console.log(window.location.hostname)
   }
}
