mod utils;

use serde::{Deserialize, Serialize};
use serde_json::{from_str, to_string};
use wasm_bindgen::prelude::*;

// This section is glue between JS and Rust:

// This will be the type targetted by our code
// when unmarshalling from JSON.
#[derive(Clone, Deserialize, Serialize)]
#[serde(untagged)]
pub enum Sortable {
    Strings(Vec<String>),
    Numbers(Vec<f64>),
}

// This will treat the destination type (Sortable) generically.
fn quicksort_interface(s: Sortable) -> Sortable {
    match s {
        Sortable::Strings(mut v) => {
            qsort(&mut v);
            Sortable::Strings(v)
        }
        Sortable::Numbers(mut v) => {
            qsort(&mut v);
            Sortable::Numbers(v)
        }
    }
}

// This is the only thing exposed to the consuming libraries.
// The argument "vec" is a JSON stringified array of either Strings or Numbers, homogenously.
#[wasm_bindgen]
pub fn quicksort(vec: String) -> Result<JsValue, JsError> {
    let vec: Sortable = from_str(&vec).map_err(|e| JsError::new(&format!("{}", e)))?;
    let res = to_string(&quicksort_interface(vec)).map_err(|e| JsError::new(&format!("{}", e)))?;
    Ok(res.into())
}

// This section is the actual implementation in Rust terms.

// The next three functions are a tiny modification to the implementation found here:
// https://www.hackertouch.com/quick-sort-in-rust.html
fn qsort<T: PartialEq + PartialOrd>(arr: &mut [T]) {
    let len = arr.len();
    _quicksort(arr, 0, (len - 1) as isize);
}

fn _quicksort<T: PartialEq + PartialOrd>(arr: &mut [T], low: isize, high: isize) {
    if low < high {
        let p = partition(arr, low, high);
        _quicksort(arr, low, p - 1);
        _quicksort(arr, p + 1, high);
    }
}

fn partition<T: PartialEq + PartialOrd>(arr: &mut [T], low: isize, high: isize) -> isize {
    let pivot = high as usize;
    let mut store_index = low - 1;
    let mut last_index = high;

    loop {
        store_index += 1;
        while arr[store_index as usize] < arr[pivot] {
            store_index += 1;
        }
        last_index -= 1;
        while last_index >= 0 && arr[last_index as usize] > arr[pivot] {
            last_index -= 1;
        }
        if store_index >= last_index {
            break;
        } else {
            arr.swap(store_index as usize, last_index as usize);
        }
    }
    arr.swap(store_index as usize, pivot);
    store_index
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_qsort() {
        let expected = vec![
            "A".to_string(),
            "B".to_string(),
            "C".to_string(),
            "D".to_string(),
        ];

        let mut unsort1 = vec![
            "B".to_string(),
            "A".to_string(),
            "C".to_string(),
            "D".to_string(),
        ];

        let mut unsort2 = vec![
            "D".to_string(),
            "C".to_string(),
            "B".to_string(),
            "A".to_string(),
        ];

        let mut unsort3 = vec![
            "C".to_string(),
            "B".to_string(),
            "D".to_string(),
            "A".to_string(),
        ];

        // sanity check:
        assert_eq!(&expected, &expected);
        assert_ne!(&expected, &unsort1);
        assert_ne!(&expected, &unsort2);
        assert_ne!(&expected, &unsort3);

        qsort(&mut unsort1);
        qsort(&mut unsort2);
        qsort(&mut unsort3);

        assert_eq!(&expected, &unsort1);
        assert_eq!(&expected, &unsort2);
        assert_eq!(&expected, &unsort3);

        let expected = [1, 2, 3];
        let mut unsort1 = [3, 2, 1];
        let mut unsort2 = [2, 3, 1];

        // sanity check:
        assert_eq!(&expected, &expected);
        assert_ne!(&expected, &unsort1);
        assert_ne!(&expected, &unsort2);

        qsort(&mut unsort1);
        qsort(&mut unsort2);

        assert_eq!(&expected, &unsort1);
        assert_eq!(&expected, &unsort2);
    }
}
