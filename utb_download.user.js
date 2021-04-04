// ==UserScript==
// @name        Download full ebook - utb.de
// @namespace   Violentmonkey Scripts
// @description This script is for scientific purposes only and not designed with the intention to assist you to violate the AGB/ToC of UTB. Please do not use this, it's just a proof of concept. It generates a command for bash that downloads and merges the individual chapters into a single PDF, if your instition has a subscription for the utb-studi-e-book programme in the first place. This tool does not circumvent the neccessity of a subscription. If you're not allowed to download a chapter, it will not work.
// @description:de Dieses Userscript dient rein wissenschaftlichen Zwecken und soll lediglich demonstrieren, wie die Downloadsperre von UTB theoretisch umgangen werden könnte, wenn eine entsprechende Berechtigung zum Download einzelner Kapitel durch das utb-studi-e-book-Programm vorläge. Wenn keine Berechtigung zum Download einzelner Kapitel vorliegt, kann auch nichts runtergeladen werden. Bitte benutze dieses Script nicht, um gegen das Urheberrecht oder die AGB von UTB zu verstoßen.
// @license     GPL-3.0-only
// @match       https://elibrary.utb.de/doi/*
// @grant       none
// @version     1.0
// @author      - actuallynotjohndoe
// @description 4/3/2021, 1:42:58 AM
// @run-at         document-end
// ==/UserScript==
/*
 * Dependencies: GNU/Linux, bash, wget, pdfunite.
 * 
 * Das Script generiert einen Downloadbefehl, der lediglich kopiert und im Downloadverzeichnis mit bash ausgeführt werden muss. 
 * Mit dem Befehl werden die einzelnen Kapitel runtergeladen und anschließend mit dem Tool pdfunite "verheiratet". 
 * Danach werden die nicht mehr benötigten Dateien gelöscht.
 * Was es nicht tut: unberechtigt Dateien von UTB runterladen. 
 */

if (confirm('Alle Kapitel runterladen?')) {
  console.log('Downloadlinks werden kombiniert.');
	//extrahiere Titel
  var title = escape(document.getElementsByClassName('current-issue__title')[0].innerHTML);
  //Etrahiere Kapitel-Links
  var chapter = document.getElementsByClassName("issue-item__title");
  var wget = 'wget ';
  var order = '';
  for (var i = 0; i < chapter.length; ++i) {
    var pfad = chapter[i].lastChild.pathname;
    var id = pfad.split('/');
    //baue Downloadlink nach folgendem Schema: https://elibrary.utb.de/doi/pdf/10.36198/9783838543116-11-20?download=true
    var url = 'https://elibrary.utb.de/doi/pdf/' + id[2] + '/' + id[3] + '?download=true';
    wget += url + ' ';
    order += id[3] + '?download=true ';
  }
  //baue Kommando für bash 
  var downloadDir = title + '.download';
  var command = 'mkdir ' + downloadDir + ' && cd ' + downloadDir + ' && ' + wget + ' && pdfunite ' + order + ' ../' + title + '.pdf && rm ' + order + ' && cd ../ && rmdir ' + title + '.download';
  //console.log(command);
  alert(command);

} else {
  console.log('Downloadlinks nicht kombinieren.');
}

