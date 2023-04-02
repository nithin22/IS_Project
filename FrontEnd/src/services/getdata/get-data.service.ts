import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }


  getData() {
    let url: string = "https://cors-anywhere.herokuapp.com/http://wave.ttu.edu/ajax.php";
    let editor: string = 'sorts' +
      '    #movies = {star_wars, the_matrix, inception, the_godfather, the_shawshank_redemption}.' +
      '    #genres = {scifi, action, thriller, drama}.' +
      '    #directors = {george_lucas, the_wachowskis, christopher_nolan, francis_ford_coppola, frank_darabont}.' +
      'predicates' +
      '    genre(#movies, #genres).' +
      '    directed_by(#movies, #directors).' +
      '    movie_title(#movies).' +
      'rules' +
      '    genre(star_wars, scifi).' +
      '    genre(the_matrix, scifi).' +
      '    genre(inception, thriller).' +
      '    genre(the_godfather, drama).' +
      '    genre(the_shawshank_redemption, drama).' +
      '    directed_by(star_wars, george_lucas).' +
      '    directed_by(the_matrix, the_wachowskis).' +
      '    directed_by(inception, christopher_nolan).' +
      '    directed_by(the_godfather, francis_ford_coppola).' +
      '    directed_by(the_shawshank_redemption, frank_darabont).' +
      '    movie_title(star_wars).' +
      '    movie_title(the_matrix).' +
      '    movie_title(inception).' +
      '    movie_title(the_godfather).' +
      '    movie_title(the_shawshank_redemption).';
    this.http.request("POST", url,
      {
        headers:
        {
          "X-Requested-With": "XMLHttpRequest"
        }
        ,
        body: {
          action: "getQuery",
          query: "genre(star_wars, scifi)",
          editor: editor,
        },
      }
    ).subscribe((data) => {
      console.log(data);
    })

  }
}
