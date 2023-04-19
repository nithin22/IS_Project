import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() {

  }

  editor: string = 'sorts\n' +
    '    #movies = {star_wars, the_matrix, inception, the_godfather, the_shawshank_redemption}.    \n' +
    '    #genres = {scifi, action, thriller, drama}.\n' +
    '    #directors = {george_lucas, the_wachowskis, christopher_nolan, francis_ford_coppola, frank_darabont}.\n' +
    'predicates\n' +
    '    genre(#movies, #genres).\n' +
    '    directed_by(#movies, #directors).\n' +
    '    movie_title(#movies).\n' +
    'rules\n' +
    '    genre(star_wars, scifi).\n' +
    '    genre(the_matrix, scifi).\n' +
    '    genre(inception, thriller).\n' +
    '    genre(the_godfather, drama).\n' +
    '    genre(the_shawshank_redemption, drama).\n' +
    '    directed_by(star_wars, george_lucas).\n' +
    '    directed_by(the_matrix, the_wachowskis).\n' +
    '    directed_by(inception, christopher_nolan).\n' +
    '    directed_by(the_godfather, francis_ford_coppola).\n' +
    '    directed_by(the_shawshank_redemption, frank_darabont).\n' +
    '    movie_title(star_wars).\n' +
    '    movie_title(the_matrix).\n' +
    '    movie_title(inception).\n' +
    '    movie_title(the_godfather).\n' +
    '    movie_title(the_shawshank_redemption).';


  url: string = 'https://cors-anywhere.herokuapp.com/http://wave.ttu.edu/ajax.php';

}
