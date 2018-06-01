import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/from"
import "rxjs/add/operator/map"
import {map, first, tap, withLatestFrom, switchMap, catchError, mapTo, scan, shareReplay, distinctUntilChanged, merge} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

export interface Details {
  id: string;
  people?: string[];
  files?: string[];
}

function getAccount(): string {
  return "asdf";
}

function getPeople(): Observable<String[]> {
  return Observable.of(["p1", "p2", "p3"]);
}
function getFiles(): Observable<String[]> {
  return Observable.of(["f1", "f2", "f3"]);
}

function loadDetails(): Observable<Details> {
  return Observable.merge(
      getPeople().map(p => ({ people: p })),
      getFiles().map(f => ({ files: f })),
    )
    .pipe(
        scan((acc: Details, value: Details) => ({...acc,...value}), { id: getAccount() })
      );
}
loadDetails().subscribe(console.log);
