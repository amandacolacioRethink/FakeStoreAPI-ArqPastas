import {describe, expect, test} from "@jest/globals"
import {productParams,getAllProductsParams,productPatchProduct} from "./mocks"
import productsRepository from "../src/repositories/productsRepository"
import productsService from "../src/services/productsService"

const categoryId = jest.spyOn(productsRepository, "findCategory").mockResolvedValueOnce([ { id: 3 } ])

describe("Products test", ()=>{
    describe("insertProduct", ()=>{
        it("Insert Product", async()=>{
            jest.spyOn(productsRepository, "insertProduct").mockResolvedValueOnce([1])
            const result = await productsService.insertProduct(productParams)
            expect(result).toMatchObject({...productParams, id:1});
        });
        it("categories not found", async ()=>{
            categoryId.mockResolvedValueOnce([]);
            try {
                const result = await productsService.insertProduct(productParams);
            } catch (error: any) {
                expect(error.message).toBe("This category was not found");
                expect(error.status).toBe(400);
            }
        })
    })
    
    describe("getAllProducts", ()=>{
        it("Get all Products", async()=>{
            jest.spyOn(productsRepository, "getAllProducts").mockResolvedValueOnce([getAllProductsParams])
            const result = await productsService.getAllProducts()
            expect(result).toMatchObject([getAllProductsParams]);
        });
    })
    
    describe("getProductById", ()=>{
        it("Get Product", async()=>{
            jest.spyOn(productsRepository, "getProductById").mockResolvedValueOnce([getAllProductsParams])
            const result = await productsService.getProductById(3)
            expect([result]).toMatchObject([getAllProductsParams]);
        });
        it("product not found", async ()=>{
            jest
            .spyOn(productsRepository, "getProductById")
            .mockResolvedValueOnce([]);
          try {
            const result = await productsService.getProductById(1);
          } catch (error: any) {
            expect(error.message).toBe("This product was not found");
            expect(error.status).toBe(400);
          }
        })
    })
    
    describe("putProduct", ()=>{
        it("Update Product", async()=>{
            jest.spyOn(productsRepository, "updateProduct").mockResolvedValueOnce([1])
            const result = await productsService.putProduct(productParams, 1)
            expect(result).toMatchObject({id:1, ...productParams});
        });
        it("categories not found", async ()=>{
            categoryId.mockResolvedValueOnce([]);
            try {
                const result = await productsService.putProduct(productParams,1);
            } catch (error: any) {
                expect(error.message).toBe("This category was not found");
                expect(error.status).toBe(400);
            }
        })
        it("product not found", async ()=>{
            jest
            .spyOn(productsRepository, "updateProduct")
            .mockResolvedValueOnce([]);
          try {
            const result = await productsService.putProduct(productParams,1);
          } catch (error: any) {
            expect(error.message).toBe("Product not found");
            expect(error.status).toBe(400);
          }
        })
    })
    
    describe("patchProduct", ()=>{
        it("Patch Product", async()=>{
            jest.spyOn(productsRepository, "updateProduct").mockResolvedValueOnce([1])
            const result = await productsService.patchProduct(1, productParams)
            expect(result).toMatchObject({id:1, ...productParams });
        });
        it("categories not found", async ()=>{
            categoryId.mockResolvedValueOnce([]);
            try {
                const result = await productsService.patchProduct(1,productParams);
            } catch (error: any) {
                expect(error.message).toBe("Category was not found");
                expect(error.status).toBe(400);
            }
        })
        it("product not found", async ()=>{
            jest
            .spyOn(productsRepository, "updateProduct")
            .mockResolvedValueOnce([]);
          try {
            const result = await productsService.patchProduct(1,productParams);
          } catch (error: any) {
            expect(error.message).toBe("Product not found");
            expect(error.status).toBe(400);
          }
        })
    })
    
    describe("deleteProduct", ()=>{
        it("Delete Product", async()=>{
            jest
            .spyOn(productsRepository, "deleteProduct")
            .mockResolvedValueOnce(1);
            const result = await productsService.deleteProduct(1);
            expect(result).toBe(1)
        });
        it("Product not found", async ()=>{
            jest
            .spyOn(productsRepository, "deleteProduct")
            .mockResolvedValueOnce(0);
          try {
            const result = await productsService.deleteProduct(1);
          } catch (error: any) {
            expect(error.message).toBe("This product was not found");
            expect(error.status).toBe(400);
          }
        })
    })
    describe("Products test", ()=>{
    
    })
    
})