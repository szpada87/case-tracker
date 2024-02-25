export default function getEnumKeys<
    T extends string,
    TEnumValue extends number>(enumVariable: { [key in T]: TEnumValue }) {
    return (Object.keys(enumVariable).filter(key => !(Number(key) >= 0)) as Array<T>);
}