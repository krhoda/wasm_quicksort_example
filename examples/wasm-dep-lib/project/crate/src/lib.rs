mod utils;
use serde::{Deserialize, Serialize};
use serde_json::{from_str, to_string};
use wasm_bindgen::prelude::*;
pub use wasm_quicksort_example::{quicksort, Sortable};

#[wasm_bindgen]
pub fn mergesort(vec: String) -> Result<JsValue, JsError> {
    let vec: Sortable = from_str(&vec).map_err(|e| JsError::new(&format!("{}", e)))?;
    let res = to_string(&mergesort_interface(vec)).map_err(|e| JsError::new(&format!("{}", e)))?;
    Ok(res.into())
}

fn mergesort_interface(s: Sortable) -> Sortable {
    match s {
        Sortable::Strings(mut v) => {
            msort(&mut v);
            Sortable::Strings(v)
        }
        Sortable::Numbers(mut v) => {
            msort(&mut v);
            Sortable::Numbers(v)
        }
    }
}

fn msort<T: PartialEq + PartialOrd + Clone>(arr: &mut [T]) {
    let n = arr.len();
    let m = n / 2;
    if n < 2 {
        return;
    };

    msort(&mut arr[0..m]);
    msort(&mut arr[m..n]);

    let mut sorted = arr.to_vec();
    merge(&arr[0..m], &arr[m..n], &mut sorted[..]);

    arr.clone_from_slice(&sorted)
}

fn merge<T: PartialEq + PartialOrd + Clone>(x1: &[T], x2: &[T], y: &mut [T]) {
    assert_eq!(x1.len() + x2.len(), y.len());
    let mut i = 0;
    let mut j = 0;
    let mut k = 0;
    while i < x1.len() && j < x2.len() {
        if x1[i] < x2[j] {
            y[k] = x1[i].clone();
            k += 1;
            i += 1;
        } else {
            y[k] = x2[j].clone();
            k += 1;
            j += 1;
        }
    }
    if i < x1.len() {
        y[k..].clone_from_slice(&x1[i..]);
    }
    if j < x2.len() {
        y[k..].clone_from_slice(&x2[j..]);
    }
}
