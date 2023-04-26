import { Injectable } from '@angular/core';
import FuzzySet from 'fuzzyset';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class AspquerygeneratorService {

  constructor(private constants: ConstantsService) {
    this.fuzzSet = FuzzySet();
    this.generator(this.constants.editor);
  }
  fuzzSet: FuzzySet;
  genQuery(value: string): any {
    try {
      //Removing Grammer from the question
      let stopwords: string[] = ["of", "the", "a", "an", "any", "is", "can", "who", "what", "why", "whom", "are"];

      let values: string[] = value.toLowerCase().replace(/[^a-zA-Z ]/g, "").split(" ").filter((val) => !stopwords.includes(val));
      values = values.reverse();
      value = values.join(" ");
      //To get Anwser in Fuzzset
      var question = this.fuzzSet.get(value);
      return (this.createPayLoad(question));
    } catch (error) {
      console.error(error);
    }
  }
  private createPayLoad(question: any): any {
    if (question != null) {
      var mainkey = question[0][1].replace('speak ', '');
      var answerarr = mainkey.split(' ');
      var key1 = '';
      answerarr.forEach((d: string) => {
        key1 = (this.predicates.get(d) != undefined) ? d : key1;
      });
      //var key1 = answerarr.length>2? answerarr[1]:answerarr[0];
      var key2 = mainkey;
      console.log(key1 + '-' + key2);
      console.log(this.predicates.get(key1)?.get(key2));

      var data = {
        'action': "getQuery",
        'query': this.predicates.get(key1)?.get(key2),
        'editor': this.constants.editor
      };

      console.log(data);
      return data;
    }
  }
  private predicates: Map<string, Map<string, string>> = new Map<string, Map<string, string>>();
  private generator(input: string): void {
    let contstring: string[] = this.constants.editor.split("sorts\n")[1].split("predicates\n");
    let sortstring: any = contstring[0].split('.');
    sortstring.splice(-1, 1);
    let sorts: Map<string, string[]> = new Map<string, string[]>();
    sortstring = sortstring.map((d: string) => d.replace(/\n/g, '').trim()).forEach((d: string) => {
      let par = d.split("=");
      sorts.set(par[0].replace(/#/, '').trim(), par[1].replace(/{|}/g, '').split(',').map(w => w.trim()));
    });
    // predicates

    contstring = contstring[1].split("rules\n");
    sortstring = contstring[0].split('.');
    sortstring.splice(-1, 1);
    //to Create Query set From Rules
    sortstring.forEach((d: string) => {
      let part: string[] = d.replace(/\n/g, '').trim().split('(');
      let func: string = part[0];
      this.predicates.set(func, new Map<string, string>());
      let par = part[1].split(',').map(e => e.replace(/#|\)/g, '').trim());
      let par1 = sorts.get(par[0])!.slice();
      // par1.push("X");
      par.splice(0, 1);
      par1.forEach(e => {
        let strinh = (e == 'X' ? '' : (e + ' ')) + func;
        this.predicates.get(func)?.set(strinh, func + "(" + e + ")");
        par.forEach(par2 => {
          // let temp = sorts.get(par2)!.slice();
          let temp = [];
          temp.push("X");
          temp.forEach(t => {
            let strinh = (e == 'X' ? '' : (e + ' ')) + func + (t == 'X' ? '' : (' ' + t));
            // if (strinh != fubnc)
            this.predicates.get(func)?.set(strinh, func + "(" + e + "," + t + ")");
          })
        });
      });
    });
    // var all_predicates: string[] = [];
    for (let key1 of this.predicates.keys()) {
      if (this.predicates.has(key1)) {
        for (let key2 of this.predicates.get(key1)?.keys()!) {
          if (this.predicates.get(key1)?.has(key2))
            // all_predicates.push(key2);
            this.fuzzSet.add(key2);
        }
      }
    }

    // return all_predicates;
  }
}
