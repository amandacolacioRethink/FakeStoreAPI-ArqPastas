import {describe, expect, test} from "@jest/globals"
import {categoryParams,categoryNames} from "./mocks"
import categoriesService from "../src/services/categoriesService"
import categoriesRepository from "../src/repositories/categoriesRepository"

describe("createCategory", ()=>{
    it("Create category", async()=>{
        jest.spyOn(categoriesRepository, "createCategory").mockResolvedValueOnce([1])
        const result = await categoriesService.createCategory(categoryParams.name)
        expect(result).toMatchObject( { ...categoryParams });
    });
    it("categories not found", async ()=>{
        
    })
})

describe("getCategoriesNames", ()=>{
    it("Get all categories name", async()=>{
        jest.spyOn(categoriesRepository, "getCategoriesNames").mockResolvedValueOnce(categoryNames)
        const result = await categoriesService.getCategoriesNames()
        expect(result).toEqual(categoryNames);
    });
})
