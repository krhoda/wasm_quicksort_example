mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, example-wasm-lib!");
}

// The next two functions are a rough re-implementation of:
// https://www.hackertouch.com/quick-sort-in-rust.html
fn quicksort<T: Eq + PartialEq + PartialOrd>(arr: &mut [T]) {
    let len = arr.len();
    _quicksort(arr, 0, (len - 1) as isize);
}

fn _quicksort<T: Eq + PartialEq + PartialOrd>(arr: &mut [T], low: isize, high: isize) {
    if low < high {
        let p = partition(arr, low, high);
        _quicksort(arr, low, p - 1);
        _quicksort(arr, p + 1, high);
    }
}

fn partition<T: Eq + PartialEq + PartialOrd>(arr: &mut [T], low: isize, high: isize) -> isize {
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

        quicksort(&mut unsort1);
        quicksort(&mut unsort2);
        quicksort(&mut unsort3);

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

        quicksort(&mut unsort1);
        quicksort(&mut unsort2);

        assert_eq!(&expected, &unsort1);
        assert_eq!(&expected, &unsort2);
    }
}
