'use client'
import React, {useMemo} from "react"

import { TextRenderer, renderNullValue, renderWithInfo } from "./TextRenderer"
import { Text } from "./BasicText"

import {
    _get,
    _isNA,
    _isNull,
    toExponential,
    toFixedWithoutZeros
} from "@/common/utils";


export const formatFloat = (value: number, precision: number = 2) => {
    const formattedValue: any = toExponential(value, precision)
    if (precision && !formattedValue.toString().includes('e')) {
        return toFixedWithoutZeros(formattedValue, precision)
    }
    return formattedValue
}

export const Float = <T,>({ props }: TextRenderer<T>) => {
    let value = _get('value', props)

    if (_isNull(value)) {
        return renderNullValue(_get('nullValue', props))
    }

    if (_isNA(value)) {
        return renderNullValue()
    }

    value = useMemo(() => formatFloat(value, _get('precision', props, null)), [props])

    return <Text props={Object.assign(props as any, { value: value })} />
}