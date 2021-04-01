/*
 * Copyright 2013 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// package com.google.zxing.pdf417.decoder;

// import com.google.zxing.pdf417.PDF417Common;
import PDF417Common from '../PDF417Common';

import { int, Collection } from '../../../customTypings';

// import java.util.ArrayList;
// import java.util.Collection;
// import java.util.HashMap;
// import java.util.Map;
// import java.util.Map.Entry;

/**
 * @author Guenther Grau
 */
export default /* final */ class BarcodeValue {
  private /* final */ values = new Map<int, int>();

  /**
   * Add an occurrence of a value
 */
  setValue(value: int): void {
    value = Math.trunc(value);
    let confidence: int = this.values.get(value);
    if (confidence == null) {
      confidence = 0;
    }
    confidence++;
    this.values.set(value, confidence);
  }

  /**
   * Determines the maximum occurrence of a set value and returns all values which were set with this occurrence.
   * @return an array of int, containing the values with the highest occurrence, or null, if no value was set
 */
  getValue(): Int32Array {
    let maxConfidence: int = -1;
    let result: Collection<int> = new Array<int>();
    for (const [key, value] of this.values.entries()) {

      const entry = {
        getKey: () => key,
        getValue: () => value,
      };

      if (entry.getValue() > maxConfidence) {
        maxConfidence = entry.getValue();
        result = [];
        result.push(entry.getKey());
      } else if (entry.getValue() === maxConfidence) {
        result.push(entry.getKey());
      }
    }
    return PDF417Common.toIntArray(result);
  }

  getConfidence(value: int): int {
    return this.values.get(value);
  }

}
