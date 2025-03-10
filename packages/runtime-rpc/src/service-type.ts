import {MethodInfo, normalizeMethodInfo, PartialMethodInfo, ServiceInfo} from "./reflection-info";
import type {JsonValue} from "@protobuf-ts/runtime";

type MethodInfoMap<Methods extends Record<string, true>> = {
    [key in keyof Methods]: MethodInfo;
}

export class ServiceType<T extends Record<string, true> = {}> implements ServiceInfo {

    /**
     * The protobuf type name of the service, including package name if
     * present.
     */
    readonly typeName: string;

    /**
     * Information for each rpc method of the service, in the order of
     * declaration in the source .proto.
     */
    readonly methods: MethodInfo[] & MethodInfoMap<T>;

    /**
     * Contains custom service options from the .proto source in JSON format.
     */
    readonly options: JsonOptionsMap;

    constructor(typeName: string, methods: PartialMethodInfo[], options?: JsonOptionsMap) {
        this.typeName = typeName;
        this.methods = methods.map(i => normalizeMethodInfo(i, this)) as MethodInfo[] & MethodInfoMap<T>;
        for (const method of this.methods) {
            ;(this.methods as any)[method.name] = method;
        }
        this.options = options ?? {};
    }
}


type JsonOptionsMap = {
    [extensionName: string]: JsonValue;
};
