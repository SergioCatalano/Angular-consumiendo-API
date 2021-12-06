import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchAllPokemonResponse, Pokemon } from '../interfaces/pokemon.interfaces';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url: string = 'https://pokeapi.co/api/v2';

  constructor( private http:HttpClient ) { }

  getAllPokemon(): Observable<Pokemon[]>{
    return this.http.get<FetchAllPokemonResponse>(`${ this.url }/pokemon?limit=1500`)
        .pipe(
          map( this.transformSmallPokemonIntoPokemon)
        )
  }

  private transformSmallPokemonIntoPokemon( resp: FetchAllPokemonResponse ): Pokemon[] {
    
    const pokemonlist: Pokemon[] = resp.results.map( poke => {

      const urlArr = poke.url.split('/');
      const id = urlArr[6];
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;

      return {
        id: id,
        //id, redundante
        pic: pic,
        //pic, redundante
        name: poke.name,
      }

    })
    
    return pokemonlist;
  }

}
