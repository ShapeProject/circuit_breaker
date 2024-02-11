#include <stdio.h>
#include <iostream>
#include <assert.h>
#include "circom.hpp"
#include "calcwit.hpp"
void ComputeRating_0_create(uint soffset,uint coffset,Circom_CalcWit* ctx,std::string componentName,uint componentFather);
void ComputeRating_0_run(uint ctx_index,Circom_CalcWit* ctx);
void Main_1_create(uint soffset,uint coffset,Circom_CalcWit* ctx,std::string componentName,uint componentFather);
void Main_1_run(uint ctx_index,Circom_CalcWit* ctx);
void decrypt_0(Circom_CalcWit* ctx,FrElement* lvar,uint componentFather,FrElement* destination,int destination_size);
void powMod_1(Circom_CalcWit* ctx,FrElement* lvar,uint componentFather,FrElement* destination,int destination_size);
Circom_TemplateFunction _functionTable[2] = { 
ComputeRating_0_run,
Main_1_run };
Circom_TemplateFunction _functionTableParallel[2] = { 
NULL,
NULL };
uint get_main_input_signal_start() {return 2;}

uint get_main_input_signal_no() {return 5;}

uint get_total_signal_no() {return 18;}

uint get_number_of_components() {return 2;}

uint get_size_of_input_hashmap() {return 256;}

uint get_size_of_witness() {return 9;}

uint get_size_of_constants() {return 15;}

uint get_size_of_io_map() {return 0;}

void release_memory_component(Circom_CalcWit* ctx, uint pos) {{

if (pos != 0){{

delete ctx->componentMemory[pos].subcomponents;

delete ctx->componentMemory[pos].subcomponentsParallel;

delete ctx->componentMemory[pos].outputIsSet;

delete ctx->componentMemory[pos].mutexes;

delete ctx->componentMemory[pos].cvs;

delete ctx->componentMemory[pos].sbct;

}}


}}


// function declarations
void decrypt_0(Circom_CalcWit* ctx,FrElement* lvar,uint componentFather,FrElement* destination,int destination_size){
FrElement* circuitConstants = ctx->circuitConstants;
FrElement expaux[4];
std::string myTemplateName = "decrypt";
u64 myId = componentFather;
{
PFrElement aux_dest = &lvar[4];
// load src
Fr_mul(&expaux[0],&lvar[1],&lvar[1]); // line circom 33
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
printf("ekNN is");
}
{
printf(" ");
}
{
char* temp = Fr_element2str(&lvar[4]);
printf("%s",temp);
delete [] temp;
}
{
printf("\n");
}
{

// start of call bucket
FrElement lvarcall[4];
// copying argument 0
Fr_copy(&lvarcall[0],&lvar[0]);
// end copying argument 0
// copying argument 1
Fr_copy(&lvarcall[1],&lvar[2]);
// end copying argument 1
// copying argument 2
Fr_copy(&lvarcall[2],&lvar[4]);
// end copying argument 2
powMod_1(ctx,lvarcall,myId,&lvar[6],1);
// end call bucket
}

{
PFrElement aux_dest = &lvar[5];
// load src
Fr_sub(&expaux[1],&lvar[6],&circuitConstants[10]); // line circom 35
Fr_idiv(&expaux[0],&expaux[1],&lvar[1]); // line circom 35
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
printf("plainNumer is");
}
{
printf(" ");
}
{
char* temp = Fr_element2str(&lvar[5]);
printf("%s",temp);
delete [] temp;
}
{
printf("\n");
}
{
printf("dkMu is");
}
{
printf(" ");
}
{
char* temp = Fr_element2str(&lvar[3]);
printf("%s",temp);
delete [] temp;
}
{
printf("\n");
}
{
PFrElement aux_dest = &lvar[7];
// load src
Fr_mul(&expaux[1],&lvar[5],&lvar[3]); // line circom 38
Fr_mod(&expaux[0],&expaux[1],&lvar[1]); // line circom 38
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
printf("ekN is");
}
{
printf(" ");
}
{
char* temp = Fr_element2str(&lvar[1]);
printf("%s",temp);
delete [] temp;
}
{
printf("\n");
}
// return bucket
Fr_copy(destination,&lvar[7]);
return;
}

void powMod_1(Circom_CalcWit* ctx,FrElement* lvar,uint componentFather,FrElement* destination,int destination_size){
FrElement* circuitConstants = ctx->circuitConstants;
FrElement expaux[4];
std::string myTemplateName = "powMod";
u64 myId = componentFather;
{
PFrElement aux_dest = &lvar[3];
// load src
// end load src
Fr_copy(aux_dest,&circuitConstants[10]);
}
Fr_gt(&expaux[0],&lvar[1],&circuitConstants[0]); // line circom 45
while(Fr_isTrue(&expaux[0])){
Fr_mod(&expaux[1],&lvar[1],&circuitConstants[11]); // line circom 46
Fr_eq(&expaux[0],&expaux[1],&circuitConstants[10]); // line circom 46
if(Fr_isTrue(&expaux[0])){
{
PFrElement aux_dest = &lvar[3];
// load src
Fr_mul(&expaux[1],&lvar[3],&lvar[0]); // line circom 47
Fr_mod(&expaux[0],&expaux[1],&lvar[2]); // line circom 47
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
}
{
PFrElement aux_dest = &lvar[0];
// load src
Fr_mul(&expaux[1],&lvar[0],&lvar[0]); // line circom 49
Fr_mod(&expaux[0],&expaux[1],&lvar[2]); // line circom 49
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &lvar[1];
// load src
Fr_shr(&expaux[0],&lvar[1],&circuitConstants[10]); // line circom 50
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
Fr_gt(&expaux[0],&lvar[1],&circuitConstants[0]); // line circom 45
}
// return bucket
Fr_copy(destination,&lvar[3]);
return;
}

// template declarations
void ComputeRating_0_create(uint soffset,uint coffset,Circom_CalcWit* ctx,std::string componentName,uint componentFather){
ctx->componentMemory[coffset].templateId = 0;
ctx->componentMemory[coffset].templateName = "ComputeRating";
ctx->componentMemory[coffset].signalStart = soffset;
ctx->componentMemory[coffset].inputCounter = 1;
ctx->componentMemory[coffset].componentName = componentName;
ctx->componentMemory[coffset].idFather = componentFather;
ctx->componentMemory[coffset].subcomponents = new uint[0];
}

void ComputeRating_0_run(uint ctx_index,Circom_CalcWit* ctx){
FrElement* signalValues = ctx->signalValues;
u64 mySignalStart = ctx->componentMemory[ctx_index].signalStart;
std::string myTemplateName = ctx->componentMemory[ctx_index].templateName;
std::string myComponentName = ctx->componentMemory[ctx_index].componentName;
u64 myFather = ctx->componentMemory[ctx_index].idFather;
u64 myId = ctx_index;
u32* mySubcomponents = ctx->componentMemory[ctx_index].subcomponents;
bool* mySubcomponentsParallel = ctx->componentMemory[ctx_index].subcomponentsParallel;
FrElement* circuitConstants = ctx->circuitConstants;
std::string* listOfTemplateMessages = ctx->listOfTemplateMessages;
FrElement expaux[8];
FrElement lvar[0];
uint sub_component_aux;
uint index_multiple_eq;
{
PFrElement aux_dest = &signalValues[mySignalStart + 2];
// load src
Fr_leq(&expaux[1],&circuitConstants[0],&signalValues[mySignalStart + 1]); // line circom 66
Fr_leq(&expaux[2],&signalValues[mySignalStart + 1],&circuitConstants[1]); // line circom 66
Fr_mul(&expaux[0],&expaux[1],&expaux[2]); // line circom 66
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 3];
// load src
Fr_leq(&expaux[1],&circuitConstants[2],&signalValues[mySignalStart + 1]); // line circom 67
Fr_leq(&expaux[2],&signalValues[mySignalStart + 1],&circuitConstants[3]); // line circom 67
Fr_mul(&expaux[0],&expaux[1],&expaux[2]); // line circom 67
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 4];
// load src
Fr_leq(&expaux[1],&circuitConstants[4],&signalValues[mySignalStart + 1]); // line circom 68
Fr_leq(&expaux[2],&signalValues[mySignalStart + 1],&circuitConstants[5]); // line circom 68
Fr_mul(&expaux[0],&expaux[1],&expaux[2]); // line circom 68
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 5];
// load src
Fr_leq(&expaux[1],&circuitConstants[6],&signalValues[mySignalStart + 1]); // line circom 69
Fr_leq(&expaux[2],&signalValues[mySignalStart + 1],&circuitConstants[7]); // line circom 69
Fr_mul(&expaux[0],&expaux[1],&expaux[2]); // line circom 69
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 6];
// load src
Fr_leq(&expaux[1],&circuitConstants[8],&signalValues[mySignalStart + 1]); // line circom 70
Fr_leq(&expaux[2],&signalValues[mySignalStart + 1],&circuitConstants[9]); // line circom 70
Fr_mul(&expaux[0],&expaux[1],&expaux[2]); // line circom 70
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 0];
// load src
Fr_mul(&expaux[4],&circuitConstants[10],&signalValues[mySignalStart + 2]); // line circom 72
Fr_mul(&expaux[5],&circuitConstants[11],&signalValues[mySignalStart + 3]); // line circom 72
Fr_add(&expaux[3],&expaux[4],&expaux[5]); // line circom 72
Fr_mul(&expaux[4],&circuitConstants[12],&signalValues[mySignalStart + 4]); // line circom 72
Fr_add(&expaux[2],&expaux[3],&expaux[4]); // line circom 72
Fr_mul(&expaux[3],&circuitConstants[13],&signalValues[mySignalStart + 5]); // line circom 72
Fr_add(&expaux[1],&expaux[2],&expaux[3]); // line circom 72
Fr_mul(&expaux[2],&circuitConstants[14],&signalValues[mySignalStart + 6]); // line circom 72
Fr_add(&expaux[0],&expaux[1],&expaux[2]); // line circom 72
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
for (uint i = 0; i < 0; i++){
uint index_subc = ctx->componentMemory[ctx_index].subcomponents[i];
if (index_subc != 0)release_memory_component(ctx,index_subc);
}
}

void Main_1_create(uint soffset,uint coffset,Circom_CalcWit* ctx,std::string componentName,uint componentFather){
ctx->componentMemory[coffset].templateId = 1;
ctx->componentMemory[coffset].templateName = "Main";
ctx->componentMemory[coffset].signalStart = soffset;
ctx->componentMemory[coffset].inputCounter = 5;
ctx->componentMemory[coffset].componentName = componentName;
ctx->componentMemory[coffset].idFather = componentFather;
ctx->componentMemory[coffset].subcomponents = new uint[1]{0};
}

void Main_1_run(uint ctx_index,Circom_CalcWit* ctx){
FrElement* signalValues = ctx->signalValues;
u64 mySignalStart = ctx->componentMemory[ctx_index].signalStart;
std::string myTemplateName = ctx->componentMemory[ctx_index].templateName;
std::string myComponentName = ctx->componentMemory[ctx_index].componentName;
u64 myFather = ctx->componentMemory[ctx_index].idFather;
u64 myId = ctx_index;
u32* mySubcomponents = ctx->componentMemory[ctx_index].subcomponents;
bool* mySubcomponentsParallel = ctx->componentMemory[ctx_index].subcomponentsParallel;
FrElement* circuitConstants = ctx->circuitConstants;
std::string* listOfTemplateMessages = ctx->listOfTemplateMessages;
FrElement expaux[5];
FrElement lvar[0];
uint sub_component_aux;
uint index_multiple_eq;
{
uint aux_create = 0;
int aux_cmp_num = 0+ctx_index+1;
uint csoffset = mySignalStart+10;
for (uint i = 0; i < 1; i++) {
std::string new_cmp_name = "computeRating";
ComputeRating_0_create(csoffset,aux_cmp_num,ctx,new_cmp_name,myId);
mySubcomponents[aux_create+i] = aux_cmp_num;
csoffset += 7 ;
aux_cmp_num += 1;
}
}
{

// start of call bucket
FrElement lvarcall[8];
// copying argument 0
Fr_copy(&lvarcall[0],&signalValues[mySignalStart + 1]);
// end copying argument 0
// copying argument 1
Fr_copy(&lvarcall[1],&signalValues[mySignalStart + 3]);
// end copying argument 1
// copying argument 2
Fr_copy(&lvarcall[2],&signalValues[mySignalStart + 4]);
// end copying argument 2
// copying argument 3
Fr_copy(&lvarcall[3],&signalValues[mySignalStart + 5]);
// end copying argument 3
decrypt_0(ctx,lvarcall,myId,&signalValues[mySignalStart + 8],1);
// end call bucket
}

{

// start of call bucket
FrElement lvarcall[8];
// copying argument 0
Fr_copy(&lvarcall[0],&signalValues[mySignalStart + 2]);
// end copying argument 0
// copying argument 1
Fr_copy(&lvarcall[1],&signalValues[mySignalStart + 3]);
// end copying argument 1
// copying argument 2
Fr_copy(&lvarcall[2],&signalValues[mySignalStart + 4]);
// end copying argument 2
// copying argument 3
Fr_copy(&lvarcall[3],&signalValues[mySignalStart + 5]);
// end copying argument 3
decrypt_0(ctx,lvarcall,myId,&signalValues[mySignalStart + 9],1);
// end call bucket
}

{
printf("plainTotScore is");
}
{
printf(" ");
}
{
char* temp = Fr_element2str(&signalValues[mySignalStart + 8]);
printf("%s",temp);
delete [] temp;
}
{
printf("\n");
}
{
printf("plainTotEvaluater is");
}
{
printf(" ");
}
{
char* temp = Fr_element2str(&signalValues[mySignalStart + 9]);
printf("%s",temp);
delete [] temp;
}
{
printf("\n");
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 6];
// load src
Fr_idiv(&expaux[0],&signalValues[mySignalStart + 8],&signalValues[mySignalStart + 9]); // line circom 21
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
printf("averageScore is");
}
{
printf(" ");
}
{
char* temp = Fr_element2str(&signalValues[mySignalStart + 6]);
printf("%s",temp);
delete [] temp;
}
{
printf("\n");
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 7];
// load src
Fr_mod(&expaux[0],&signalValues[mySignalStart + 8],&signalValues[mySignalStart + 9]); // line circom 23
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
Fr_mul(&expaux[2],&signalValues[mySignalStart + 6],&signalValues[mySignalStart + 9]); // line circom 24
Fr_add(&expaux[1],&expaux[2],&signalValues[mySignalStart + 7]); // line circom 24
Fr_eq(&expaux[0],&expaux[1],&signalValues[mySignalStart + 8]); // line circom 24
if (!Fr_isTrue(&expaux[0])) std::cout << "Failed assert in template/function " << myTemplateName << " line 24. " <<  "Followed trace of components: " << ctx->getTrace(myId) << std::endl;
assert(Fr_isTrue(&expaux[0]));
{
uint cmp_index_ref = 0;
{
PFrElement aux_dest = &ctx->signalValues[ctx->componentMemory[mySubcomponents[cmp_index_ref]].signalStart + 1];
// load src
// end load src
Fr_copy(aux_dest,&signalValues[mySignalStart + 6]);
}
// need to run sub component
assert(!(ctx->componentMemory[mySubcomponents[cmp_index_ref]].inputCounter -= 1));
ComputeRating_0_run(mySubcomponents[cmp_index_ref],ctx);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 0];
// load src
// end load src
Fr_copy(aux_dest,&ctx->signalValues[ctx->componentMemory[mySubcomponents[0]].signalStart + 0]);
}
for (uint i = 0; i < 1; i++){
uint index_subc = ctx->componentMemory[ctx_index].subcomponents[i];
if (index_subc != 0)release_memory_component(ctx,index_subc);
}
}

void run(Circom_CalcWit* ctx){
Main_1_create(1,0,ctx,"main",0);
Main_1_run(0,ctx);
}

